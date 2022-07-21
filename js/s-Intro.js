// fullscrin slider
const fullWidthSwiper = document.querySelector('.fw-sp')

let firstSwiper = new Swiper(fullWidthSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,
	grabCursor: true,

	effect: 'fade',

});

// small slider
const navigationSwiper = document.querySelector('.nv-sp')

let secondSwiper = new Swiper(navigationSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,

	navigation: {
		prevEl: '.nv-sp-btn-prv',
		nextEl: '.nv-sp-btn-nxt',
	},

	scrollbar: {
		el: '.nv-sp-scrlbr',
		draggable: true,
	},

	pagination: {
		el: '.nv-sp-pgn',
		// type: 'fraction',
		type: 'custom',
		renderCustom: function (sp, cr, tt) {
			let indT = tt >= 10 ? cr : `0${tt}`
			let indC = cr >= 10 ? cr : `0${cr}`
			return `<span>${indC}</span><span">/${indT}</spanss=>`
		}
	},

});

// контроль/группировка слайдеров
firstSwiper.controller.control = secondSwiper;
secondSwiper.controller.control = firstSwiper;