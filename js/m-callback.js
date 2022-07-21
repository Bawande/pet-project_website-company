// валидация
// форма модального окна
// валидация модального окна - связаться с нами
const modalValidation = new JustValidate('#form-callback-modal');

modalValidation

	.addField('.input-name-mc', [
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

	.addField('.input-mail-mc', [
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

	.addField('.input-tel-mc', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Телефон обязателен',
		},
		{
			rule: 'function',
			validator: function () {

				let telSelector = document.querySelector('.input-tel-mc');
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
		let acceptedForm = document.querySelector('.modal-callback__accepted');
		acceptedForm?.classList.add('accepted');

		// сбрасываю значения формы
		event.target.reset();

		// пауза
		// закрытие окна если оно есть 
		// удаляю значения стиля отпралено
		// удаляю значения позиции вызванной формы
		setTimeout(() => {

			let mcrMdlWin = document.querySelector('#id-modal-callback');
			if (mcrMdlWin?.classList.contains('is-open')) {
				// console.log('Close');
				MicroModal.close('id-modal-callback');
			}

			acceptedForm?.classList.remove('accepted');
			posForm.setAttribute('value', '');
		}, 3000);


	});