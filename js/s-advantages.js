// слайдер секция Преимущества
const advantagesSwiper = document.querySelector('.advantages__swiper')

let advanSwiper = new Swiper(advantagesSwiper, {

	// slidesPerView: 3,
	// spaceBetween: 0,
	// autoHeight: false,



	navigation: {
		prevEl: '.advantages__btn-prv',
		nextEl: '.advantages__btn-nxt',
	},

	scrollbar: {
		el: '.advantages__scrollbar',
		draggable: true,
	},

	pagination: {
		el: '.advantages__pagination',
		// type: 'fraction',
		type: 'custom',
		renderCustom: function (sp, cr, tt) {
			let indT = tt >= 10 ? cr : `0${tt}`
			let indC = cr >= 10 ? cr : `0${cr}`
			return `<span>${indC}</span><span>/${indT}</span>`
		}
	},

	breakpoints: {
		// when window width is >= 320px
		0: {
			slidesPerView: 1,
			spaceBetween: 32,

			grid: {
				rows: 1,
			},
		},
		// when window width is >= 576px
		620: {
			slidesPerView: 2,
			// spaceBetween: 0,

			grid: {
				rows: 3,
			}
		},
		// when window width is >= 1024px
		1110: {
			slidesPerView: 3,
			// spaceBetween: 32,

			grid: {
				rows: 2,
			}
		}
	}

});