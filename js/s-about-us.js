// слайдер секция О компании
const aboutUsSwiperSelector = document.querySelector('.about-us__swiper')

let aboutUsSwiper = new Swiper(aboutUsSwiperSelector, {

	grabCursor: true,

	navigation: {
		prevEl: '.about-us__btn-prv',
		nextEl: '.about-us__btn-nxt',
	},

	// scrollbar: {
	// 	el: '.advantages__scrollbar',
	// 	draggable: true,
	// },

	// pagination: {
	// 	el: '.advantages__pagination',
	// 	// type: 'fraction',
	// 	type: 'custom',
	// 	renderCustom: function (sp, cr, tt) {
	// 		let indT = tt >= 10 ? cr : `0${tt}`
	// 		let indC = cr >= 10 ? cr : `0${cr}`
	// 		return `<span>${indC}</span><span">/${indT}</spanss=>`
	// 	}
	// },

	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 0,

			grid: {
				rows: 1,
			}
		},
		// when window width is >= 1024px
		1025: {
			slidesPerView: 1,
			spaceBetween: 0,

			grid: {
				rows: 3,
			}
		}
	}

});