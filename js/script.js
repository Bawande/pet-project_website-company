// слайдер модального окна карточка товара маленький
// слайдер модального окна карточка товара большой
const smallProductSwiper = document.querySelector('.mpc__sml-img-swp');
const largeProductSwiper = document.querySelector('.mpc__lrg-img-swp');

let secondModalSwiper = new Swiper(smallProductSwiper, {

	slidesPerView: 5,
	spaceBetween: 8,
});


let firstModalSwiper = new Swiper(largeProductSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,
	grabCursor: true,

	// effect: 'fade',

	thumbs: {
		swiper: secondModalSwiper,
	},

});


// контроль/группировка слайдеров
// firstModalSwiper.controller.control = secondModalSwiper;
// secondModalSwiper.controller.control = firstModalSwiper;

// инициализация модального окна 
MicroModal.init({
	// onShow: modal => console.info(`${modal.id} is shown`), // [1]
	// onClose: modal => console.info(`${modal.id} is hidden`), // [2]
	openTrigger: 'data-custom-open',
	closeTrigger: 'data-custom-close',
	openClass: 'is-open',
	disableScroll: true,
	disableFocus: true,
	awaitOpenAnimation: false,
	awaitCloseAnimation: false

});

// добавляю значение позиции вызванной формы (откуда вызвано модальное окно)
const openForm = document.querySelectorAll('[data-custom-open]');
const posForm = document.querySelector('input[name="position"]');

openForm.forEach(el => {

	el.addEventListener('click', () => {

		posForm.setAttribute('value',
			el.getAttribute("data-position-form")
		);
	})
});

// маска ввода
Inputmask({
	mask: "+7 (999) 999-99-99",
	showMaskOnHover: false,
	showMaskOnFocus: false,

}).mask(document.querySelectorAll('input[type = "tel"]'));




//-------------


async function setData(url, data) {

	const response = await fetch(url, {
		method: 'POST',
		body: data,
	})

	if (!response.ok) {
		throw new Error(`Error ${url}, status ${response}`)
	}

	return await response.json()
}










