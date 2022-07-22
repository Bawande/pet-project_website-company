// слайдер секция бренд
const brandSwiper = document.querySelector('.brands-swiper')

let thirdSwiper = new Swiper(brandSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,

	navigation: {
		prevEl: '.brands-swiper__btn-prv',
		nextEl: '.brands-swiper__btn-nxt',
	},

	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1.2,
			spaceBetween: 16,
		},
		650: {
			slidesPerView: 1,
			spaceBetween: 32,
		},
		// when window width is >= 1024px
		// 1024: {
		// 	slidesPerView: 1,
		// 	// spaceBetween: 32,
		// },
		// 1200: {
		// 	slidesPerView: 3,
		// 	spaceBetween: 32,
		// }
	}

});