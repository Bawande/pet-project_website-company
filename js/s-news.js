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
			slidesPerView: 1.7,
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

// обработка событий секции новости 
// открытие модального окна новости
const companyNews = document.querySelector('.news__container');

companyNews.addEventListener('click', (event) => {
	// console.log(event.target.classList.contains('card-news'));
	// console.log(event.target.className);
	// if (event.target.classList.contains('card-news')) {
	// if (event.target.dataset.news) {
	if (event.target.closest('.card-news')) {
		event.stopPropagation();
		// запускаем модальное новости
		MicroModal.show('id-modal-company-news', {
			openTrigger: 'data-custom-open',
			closeTrigger: 'data-custom-close',
			openClass: 'is-open',
			disableScroll: true,
			disableFocus: true,
		});
	}
})