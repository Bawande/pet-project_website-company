// слайдер секция новости
const newsSwiper = document.querySelector('.ns-sp')

let fourthSwiper = new Swiper(newsSwiper, {

	// slidesPerView: 1.2,
	// spaceBetween: 32,

	navigation: {
		prevEl: '.ns-sp-btn-prv',
		nextEl: '.ns-sp-btn-nxt',
	},

	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1.2,
			spaceBetween: 16,
		},
		768: {
			slidesPerView: 1.6,
			spaceBetween: 32,
		},
		// when window width is >= 1024px
		1024: {
			slidesPerView: 2.2,
			spaceBetween: 32,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 32,
		}
	}

});