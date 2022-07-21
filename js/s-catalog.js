// каталог
// карточки товара 
const cardsCatalog = document.querySelectorAll("[data-product-card-article]");

// каталог - фильтры

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


	console.log(articleCard.getAttribute('data-product-modal-article'));


});


// каталог - загрузить еще
const loadMoreButton = document.querySelector("[data-product-card-btn]");
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
		console.log(i);

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