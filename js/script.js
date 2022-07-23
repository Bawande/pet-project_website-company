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


// валидация фрмы на главной странице - партерство
const cooperationValidation = new JustValidate('#form-cooperation-validate');

cooperationValidation

	.addField('.input-name-cprt', [
		{
			rule: 'minLength',
			value: 3,
			errorMessage: 'Минимум 3 символа!'
		},
		{
			rule: 'maxLength',
			value: 15,
			errorMessage: 'Максимум 15 символов!'
		},
		{
			rule: 'required',
			value: true,
			errorMessage: 'Введите имя!'
		}
	])

	.addField('.input-mail-cprt', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Email обязателен',
		},
		{
			rule: 'email',
			value: true,
			errorMessage: 'Введите корректный Email',
		},
	])

	.addField('.input-tel-cprt', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Телефон обязателен',
		},
		{
			rule: 'function',
			validator: function () {

				let telSelector = document.querySelector('.input-tel-cprt');
				let phone = telSelector.inputmask.unmaskedvalue();
				return phone.length === 10;
			},
			errorMessage: 'Введите корректный телефон',
		},
	])

	.onSuccess((event) => {
		console.log('Validation passes and form submitted', event);

		let formData = new FormData(event.target);

		console.log(...formData);

		// let xhr = new XMLHttpRequest();

		// xhr.onreadystatechange = function () {
		// 	if (xhr.readyState === 4) {
		// 		if (xhr.status === 200) {
		// 			console.log('Отправлено');
		// 		}
		// 	}
		// }

		// xhr.open('POST', 'mail.php', true);
		// xhr.send(formData);

		// добавляю класс формы отправленно / вывожу сообщение об отправке
		let acceptedForm = document.querySelector('.cooperation__accepted');
		acceptedForm?.classList.add('accepted');

		// сбрасываю значения формы
		event.target.reset();

		// пауза
		// удаляю значения стиля отпралено
		// удаляю значения позиции вызванной формы
		setTimeout(() => {
			acceptedForm?.classList.remove('accepted');
			posForm.setAttribute('value', '');
		}, 3000);


	});












