// слайдер секция бренд
const brandSwiper = document.querySelector('.br-sp')

let thirdSwiper = new Swiper(brandSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,

	navigation: {
		prevEl: '.br-sp-btn-prv',
		nextEl: '.br-sp-btn-nxt',
	},

});