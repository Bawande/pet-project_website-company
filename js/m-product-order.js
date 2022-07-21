// валидация модального окна - связаться с нами
const modalProductCardValidation = new JustValidate('#form-product-order');

modalProductCardValidation

	.addField('.input-name-mpo', [
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

	.addField('.input-mail-mpo', [
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

	.addField('.input-tel-mpo', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Телефон обязателен',
		},
		{
			rule: 'function',
			validator: function () {

				let telSelector = document.querySelector('.input-tel-mpo');
				let phone = telSelector.inputmask.unmaskedvalue();
				return phone.length === 10;
			},
			errorMessage: 'Введите корректный телефон',
		},
	])

	.onSuccess((event) => {
		// console.log('Validation passes and form submitted', event);

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
		let acceptedForm = document.querySelector('.modal-product-order__accepted');
		acceptedForm?.classList.add('accepted');

		// сбрасываю значения формы
		event.target.reset();

		// пауза
		// удаляю значения стиля отпралено
		// закрываем форму
		setTimeout(() => {

			let mcrMdlWin = document.querySelector('#id-modal-product-order');
			if (mcrMdlWin?.classList.contains('is-open')) {
				// console.log('Close');
				MicroModal.close('id-modal-product-order');
			}

			acceptedForm?.classList.remove('accepted');
		}, 3000);


	});