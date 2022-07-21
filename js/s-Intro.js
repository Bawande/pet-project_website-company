// fullscrin slider
const fullWidthSwiper = document.querySelector('.bgr-swiper')

let firstSwiper = new Swiper(fullWidthSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,
	grabCursor: true,

	effect: 'fade',

});

// small slider
const navigationSwiper = document.querySelector('.nav-swiper')

let secondSwiper = new Swiper(navigationSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,

	navigation: {
		prevEl: '.nav-swiper__btn-prv',
		nextEl: '.nav-swiper__btn-nxt',
	},

	scrollbar: {
		el: '.nav-swiper__scroll-bar',
		draggable: true,
	},

	pagination: {
		el: '.nav-swiper__pagination',
		// type: 'fraction',
		type: 'custom',
		renderCustom: function (sp, cr, tt) {
			let indT = tt >= 10 ? cr : `0${tt}`
			let indC = cr >= 10 ? cr : `0${cr}`
			return `
			<span>${indC}</span>
			<span>/${indT}</span>
			`
		}
	},

});

// контроль/группировка слайдеров
firstSwiper.controller.control = secondSwiper;
secondSwiper.controller.control = firstSwiper;