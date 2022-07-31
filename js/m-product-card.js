// слайдер модального окна карточка товара маленький
// слайдер модального окна карточка товара большой
const smallProductSwiper = document.querySelector('.mpc__sml-img-swp');
const largeProductSwiper = document.querySelector('.mpc__lrg-img-swp');

let secondModalSwiper = new Swiper(smallProductSwiper, {

	slidesPerView: 5,
	spaceBetween: 8,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
});


let firstModalSwiper = new Swiper(largeProductSwiper, {

	slidesPerView: 1,
	spaceBetween: 0,
	grabCursor: true,

	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	thumbs: {
		swiper: secondModalSwiper,
	},

});