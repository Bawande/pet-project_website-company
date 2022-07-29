
import pruductDBJSON from "https://bawande.github.io/pet-project_website-company/js/_catalog_objects.js"
import loadInitialCards from "https://bawande.github.io/pet-project_website-company/js/_catalog_load-cards.js"
import loadInitialFilters from "https://bawande.github.io/pet-project_website-company/js/_catalog_load-filter.js"
import filtersDropDownMenu from "https://bawande.github.io/pet-project_website-company/js/_catalog_drop-menu.js"
// import pruductDBJSON from "../js/_catalog_objects.js"
// import loadInitialCards from "../js/_catalog_load-cards.js"
// import loadInitialFilters from "../js/_catalog_load-filter.js"
// import filtersDropDownMenu from "../js/_catalog_drop-menu.js"


localStorage.setItem("product", JSON.stringify(pruductDBJSON));

const cards = JSON.parse(localStorage.getItem("product"));

window.addEventListener('DOMContentLoaded', () => {

	// инициализация и вывод фильтров
	loadInitialFilters('#filtersWrapType', 'type');
	loadInitialFilters('#filtersWrapAppointment', 'appointment');

	//определение типа селекторов фильтра (мобильный/компьтер)
	definingTypeFilterSelectors();

	// обработчик состояний селектора
	// handlerStatusSelector();

	// инициализация и вывод карточек товара
	loadInitialCards(filteringArray(cards, getValueActiveFilter()));

	// слушатель на кнопку загрузить еще
	document.querySelector("[data-load-more-button]")
		.addEventListener('click', () => {
			loadInitialCards(filteringArray(cards, getValueActiveFilter()), true);
		})

	/**
	* отследить событе нажатие селектора тега фильтра
	* получить текущее состояние фильтров
	* отсортировать массив карточек
	* вывести массив
	*/
	delegatingEventsClick('[data-filter]', '.filter__item input[type=radio]', () => {
		loadInitialCards(filteringArray(cards, getValueActiveFilter()))
	});

	// отслеживания событий изменения размера вьюпорта
	window.addEventListener('resize', () => {
		//определение типа селекторов фильтра (мобильный/компьтер)
		definingTypeFilterSelectors();
	});


	// инициализация дропдаун меню
	filtersDropDownMenu();

	// инициализация логики запуска модального окна
	openOrderCard();

	openProductOrder();

	// END DOMContentLoaded
})

/**
 * функция openOrderCard логика открытия модального окна карточки товара product-card
 * повесить слушатель на контейнер карточек
 * отследить событие клика по карточке
 * получить id номер карточки
 * получить объект по id
 * деструктурировать объект
 * обработать данные
 * вывести данные на страницу
 * запустить модальное окно
 */
function openOrderCard() {

	document.querySelector('.catalog-product__cards-list')
		.addEventListener('click', (event) => {
			if (event.target.closest('[data-product-card-article]')) {
				const idCardValue = event.target.closest('[data-product-card-article]').dataset.productCardArticle;

				// получение данных 
				let objectCard;
				cards.forEach((card) => {
					if (card['id'] === idCardValue) {
						objectCard = JSON.parse(JSON.stringify(card));
					}
				})

				// добавим карточку товара в localstorage
				localStorage.setItem("cardOrder", JSON.stringify(objectCard));

				// определение переменных
				const { name, type, appointment, images, description, term, ...other } = objectCard;
				const modalTitle = document.querySelector('.modal-product-card__product-title');
				const modalDescription = document.querySelector('.modal-product-card__content');
				const modalImgSwiper = document.querySelector('.mpc__lrg-img-swp-wrp');
				const modalImgSwiperSmall = document.querySelector('.mpc__sml-img-swp-wrp');
				let contentOut = '';
				let swiperBigImgOut = '';
				let swiperSmallImgOut = '';

				// обработка данных
				contentOut = `
				<div data-modal-description>
				<div class="modal-product-card__product-pack" data-signature="Назначение/цели применения:">
					${type.slice(1).join(', ')}
				</div>

				<div class="modal-product-card__product-description text">
					${description}
				</div>
					
				<div class="modal-product-card__product-storage" data-signature="Срок годности средства:">
					${term}
				</div>
				</div>
				`;

				images.forEach(img => {
					swiperBigImgOut += `
					<!-- Slide -->
					<div class="mpc__lrg-img-swp-sld swiper-slide">
						<div class="mpc__lrg-img-sld-wrap">
							<img src="./catalog/${idCardValue}/${img}" alt="">
						</div>
					</div>
					`;
				})

				images.forEach(img => {
					swiperSmallImgOut += `
					<!-- Slide -->
					<div class="mpc__sml-img-swp-sld swiper-slide">
						<div class="mpc__sml-img-sld-wrap">
							<img src="./catalog/${idCardValue}/${img}" alt="">
						</div>
					</div>
					`;
				})


				// вывод данных 
				modalTitle.innerText = name;
				modalDescription.innerHTML = contentOut;
				modalImgSwiper.innerHTML = swiperBigImgOut;
				modalImgSwiperSmall.innerHTML = swiperSmallImgOut;
				// modalDescription.insertAdjacentHTML('beforeend', contentOut);


				// запускаем модальное окно
				MicroModal.show('id-modal-product-card', {
					// onShow: modal => console.info(`${modal.id} is shown`), // [1]
					onClose: (modal) => {
						// удалим карточку товара в localstorage
						localStorage.removeItem("cardOrder");
					},
					openTrigger: 'data-custom-open',
					closeTrigger: 'data-custom-close',
					openClass: 'is-open',
					disableScroll: true,
					disableFocus: true,
				});
				// console.log(idCardValue)
			}
		})
}

/**
 * функция openProductOrder логика открытия модального окна офрмления заказа id-modal-product-order
 * отследить событие нажатия мыши на кнопку
 * получить данные из localstorage о карточке товара cardOrder
 * обработать данные
 * вывести данные
 * запустить модальное окно id-modal-product-order
 * закрыть модальное окно карточки товара id-modal-product-card
 */
function openProductOrder() {
	document.querySelector('#id-modal-product-card')
		.addEventListener('click', event => {
			if (event.target.closest('[data-product-order-btn]')) {
				// получение данных из localstorage
				const orderCard = JSON.parse(localStorage.getItem("cardOrder"));
				// закрыть модальное окно id-modal-product-card
				MicroModal.close('id-modal-product-card');
				// обработка данных
				const orderModalWin = document.querySelector('#id-modal-product-order')
				const orderTitle = orderModalWin.querySelector('.modal-product-order__product')
				// const orderID = orderModalWin.querySelector('input[name="product-id"]')
				const orderDescription = orderModalWin.querySelector('.modal-product-order__description')
				const orderName = orderModalWin.querySelector('input[name="product-name"]')

				const { id, name, ...other } = orderCard;
				const out = `
					<input type="text" name="product-id" value="${id}" hidden>
					<input type="text" name="product-name" value="${name}" hidden>
				`;
				// вывод данных
				orderTitle.innerText = name;
				orderDescription.innerHTML = out;
				// открытие модального окна формления заказа
				MicroModal.show('id-modal-product-order', {
					// onShow: modal => console.info(`${modal.id} is shown`), // [1]
					// onClose: modal => console.info(`${modal.id} is hidden`), // [2]
					openTrigger: 'data-custom-open',
					closeTrigger: 'data-custom-close',
					openClass: 'is-open',
					disableScroll: true,
					disableFocus: true,
				});
				console.log(orderName)
			}
		})

}

/**
 * Функция делегирования событий. Позволяет отслеживать всплытие и перехват событий
 * При выполнении условия выполняет callback функцию
 * доступны переменные event (объекта) и area (область)
 * @param {*} areaEventSelector имя селектора области события нажатия мыши
 * @param {*} objEventSelector имя селектора объекта события нажатия мыши
 * @param {*} callbackFunctionEvent функция которая будет выполнена в случае если условие будет выполнено
 * @returns логическое значения, если область найдена true, если нет false
 */
function delegatingEventsClick(areaEventSelector, objEventSelector, callbackFunctionEvent) {

	let result = false;
	document.querySelectorAll(`${areaEventSelector}`)
		.forEach((area) => {
			result = true;
			area.addEventListener('click', event => {
				if (event.target.closest(`${objEventSelector}`)) {
					callbackFunctionEvent();
				}
			})

		})

	return result;
}

/**
 * функция поиска элементов массива подходящих под все условия фильтрации
 * @param {array} arrObjects массив объектов
 * @param {array} arrayFilters массив фильтров {key: секция value: активный селектор}
 * @returns отфильтрованный массив
 */
function filteringArray(arrObjects, arrayFilters) {

	// перебор с фильтрацией основного массива
	return arrObjects.filter((el) => {
		let result = true;

		// перебор массива фильтров
		arrayFilters.forEach((object) => {

			// поиск совпадения фильтров в основном массиве по ключу
			for (const key in object) {
				const element = object[key];

				if (el[key].indexOf(element) === -1) {
					result = false;
					break
				}
			}
		})
		return result
	})
}

/**
 * функция ищет в ДОМ активный селектор фильтра .filter__item
 * функция ищет в ДОМ название секций селекторов [data-filter-list]
 * @returns массив объектов {key: секция value: активный селектор}
 */
function getValueActiveFilter() {
	const arrayResult = [];

	document.querySelectorAll('[data-filter]')
		.forEach((area) => {
			let selectorCheck = undefined;
			area.querySelectorAll('.filter__item')
				.forEach(el => {
					if (el.querySelector('input[type="radio"]').checked) {
						selectorCheck = el.querySelector('label').innerText;
					}
				})

			const filterList = area.querySelector('[data-filter-list]')?.dataset.filterList;
			arrayResult.push({ [filterList]: selectorCheck })
		})
	return arrayResult;
}

// /**
//  * 
//  * @param {*} filter 
//  * @param {*} key 
//  * @param {*} array 
//  * @returns 
//  */
// function filteringArrayCards(filter, key, array) {

// 	const resultArray = array.filter((el) => {

// 		if (Array.isArray(el[key])) {
// 			return el[key].indexOf(filter) !== -1 ? true : false;
// 		}
// 	})

// 	return resultArray;
// }




// каталог
// карточки товара 

// console.log(cardsCatalog)
// каталог - фильтры
/*
const cardsCatalog = document.querySelectorAll("[data-product-card-article]");
// каталог - открытие подробной карточки товара
	
cardsCatalog.forEach(el => {
	
	el.addEventListener('click', () => {
	
		// console.log(el.setAttribute("data-product-card-article"));
	
		// передаем артикл
		const articleCard = document.querySelector('#product-modal-article');
		if (articleCard) {
			articleCard.innerHTML = el.getAttribute('data-product-card-article');
			articleCard.setAttribute('data-product-modal-article',
				el.getAttribute('data-product-card-article')
			);
		}
		// запускаем модальное окно
		MicroModal.show('id-modal-product-card', {
			// onShow: modal => console.info(`${modal.id} is shown`), // [1]
			// onClose: modal => console.info(`${modal.id} is hidden`), // [2]
			openTrigger: 'data-custom-open',
			closeTrigger: 'data-custom-close',
			openClass: 'is-open',
			disableScroll: true,
			disableFocus: true,
		});
	})
});
	
// каталог - открытие формы заказа товара
	
// кнопка заказа товара
const productOrderBtn = document.querySelector('[data-product-order-btn]');
	
productOrderBtn.addEventListener('click', function () {
	
	// получим значения артикля в карточке товара
	const articleCard = document.querySelector("#product-modal-article");
	// закроем модальное окно карточки товара
	let mcrMdlWin = document.querySelector('#id-modal-product-card');
	if (mcrMdlWin?.classList.contains('is-open')) {
		// console.log('Close');
		MicroModal.close('id-modal-product-card');
	}
	// заполним поле артикля
	const productArticle = document.querySelector("#product-article");
	if (productArticle) {
		productArticle.setAttribute('value',
			articleCard.getAttribute('data-product-modal-article')
		);
	}
	// откроем модальное окно формления заказа
	MicroModal.show('id-modal-product-order', {
		// onShow: modal => console.info(`${modal.id} is shown`), // [1]
		// onClose: modal => console.info(`${modal.id} is hidden`), // [2]
		openTrigger: 'data-custom-open',
		closeTrigger: 'data-custom-close',
		openClass: 'is-open',
		disableScroll: true,
		disableFocus: true,
	});
	
	
	// console.log(articleCard.getAttribute('data-product-modal-article'));
	
	
});
	
	
// каталог - загрузить еще
	
// колличество элементов массива cardsCatalog
const countCardsCatalog = Object.keys(cardsCatalog).length;
// console.log("Всего элементов в массиве =", countElementsCard);
	
// сколько показывать при загрузке
const startViewCard = 12;
// сколько добавить при нажатии кнопки
const moreViewCard = 3;
	
// скроем все карточки
hideCards(countCardsCatalog);
// покажем стартовые карточки startViewCard
showCards(startViewCard);
	
	
loadMoreButton.addEventListener('click', function () {
	
	// найдем все скрытые карточки
	const hiddenCard = document.querySelectorAll(".hidden");
	
	setTimeout(() => {
	
		let i = 0;
		hiddenCard.forEach(el => {
			if (i < moreViewCard) {
				el.classList.remove('hidden')
			}
			i++;
		})
	
		let card = document.querySelectorAll(".hidden");
		if (!card.length) {
			loadMoreButton.classList.add('hidden')
		};
		// console.log(i);
	
	}, 200);
});
	
// функция скрытия карточки
function hideCards(count) {
	let i = 0;
	cardsCatalog.forEach(el => {
	
		if (i < count) {
			el.classList.add('hidden')
		}
		i++;
	})
};
	
// функция показа карточки
function showCards(count) {
	let i = 0;
	cardsCatalog.forEach(el => {
	
		if (i < count) {
			el.classList.remove('hidden')
		}
		i++;
	})
};
*/




/**
 * определение типа селекторов фильтра в зависимосимости от размера экрана (мобильный/компьтер)
 * 
 */
function definingTypeFilterSelectors() {

	const widthWind = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const filterList = document.querySelectorAll('.filter__list')
	const filterItem = document.querySelectorAll('.filter__item')
	const brnsSelected = document.querySelectorAll('[data-btn-droplist]');

	if (widthWind <= 480) {
		// селекторы
		filterItem.forEach((el) => {
			el.classList.remove('teg');
			el.classList.add('teg-mobile');
		});
		// обертка селекторов
		filterList.forEach((el) => {
			el.classList.add('mobile');
			el.classList.add('hidden');
		});
		// кнопка выбора
		brnsSelected.forEach((el) => {
			el.classList.remove('hidden');
		});
	} else {

		// селекторы
		filterItem.forEach((el) => {
			el.classList.remove('teg-mobile');
			el.classList.add('teg');
		});
		// обертка селекторов
		filterList.forEach((el) => {
			// console.log(el)
			el.classList.remove('mobile');
			el.classList.remove('hidden');
		});
		// кнопка выбора
		brnsSelected.forEach((el) => {
			el.classList.add('hidden');
		});
	}
}


