import pruductDBJSON from "./_catalog_objects.mjs"
import loadInitialCards from "./_catalog_load-cards.mjs"
import loadInitialFilters from "./_catalog_load-filter.mjs"

localStorage.setItem("product", JSON.stringify(pruductDBJSON));


window.addEventListener('DOMContentLoaded', () => {

	// инициализация фильтров
	loadInitialFilters('#filtersWrapType', 'appointment');
	loadInitialFilters('#filtersWrapAppointment', 'type');

	// инициализация карточек каталога товара
	loadInitialCards();
	// слушатель на кнопку загрузить еще
	const loadMoreButton = document.querySelector("[data-load-more-button]");
	loadMoreButton.addEventListener('click', () => {
		loadInitialItems(true);
	})

	// END DOMContentLoaded
})





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


// отслеживания событий вьюпорта
// вызывает функцию переопределения стиля селектора 
window.addEventListener('resize', (event) => {
	overridesStyleSelector();
});

// функция переопределяет стили элементов блока селекторов
// в зависимости от размера вьюпорта
function overridesStyleSelector() {

	const widthWind = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const filterList = document.querySelectorAll('.filter__list')
	const filterItem = document.querySelectorAll('.filter__item')
	const brnsSelected = document.querySelectorAll('[data-btn-droplist]');

	if (widthWind <= 480) {
		// селекторы
		filterItem.forEach((el) => {
			el.classList.remove('teg');
			el.classList.add('teg-droplist');
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
			el.classList.remove('teg-droplist');
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
// вызов функции
overridesStyleSelector();

// работа с селекторами (тегами) фильтра на мобильных телефонах
const filtersList = document.querySelectorAll('[data-filter]');

filtersList.forEach((filterWrap) => {

	const brnSelected = filterWrap.querySelector('[data-btn-droplist]');
	const listSelector = filterWrap.querySelectorAll('input[type=radio]')
	const checkedSelector = filterWrap.querySelector('input[checked] ~ label').innerText;
	const filterList = filterWrap.querySelector('.filter__list')

	const pageWrapper = document.querySelector('[data-menu-overlay]');
	const body = document.body;

	// console.log(brnSelected);
	// console.log(checkedSelector);
	// console.log(listSelector);

	brnSelected.innerHTML = checkedSelector;

	// логика выбора активного селектора
	// логика закрытия по выбору/нажатию селектора
	listSelector.forEach((e) => {

		e.addEventListener('click', event => {
			const selectorValue = event.target.closest('.filter__item').innerText;
			brnSelected.innerHTML = selectorValue;

			if (pageWrapper?.classList.contains('active')) {

				filterList?.classList.add('hidden');

				setTimeout(() => {
					body?.classList.remove('sb-stop-scroll');
					pageWrapper?.classList.remove('active');
				}, 10)
			}
		})

	})

	// логика открытия меню фильтров
	brnSelected.addEventListener('click', () => {

		filterList.classList.remove('hidden');
		body?.classList.add('sb-stop-scroll');
		pageWrapper?.classList.add('active');
	})

	// логика закрытия по нажатию клавиши
	window.addEventListener('keydown', function (event) {

		if (pageWrapper?.classList.contains('active') && event.key === "Escape") {

			filterList?.classList.add('hidden');

			setTimeout(() => {
				body?.classList.remove('sb-stop-scroll');
				pageWrapper?.classList.remove('active');
			}, 10)
		}
	});

})

