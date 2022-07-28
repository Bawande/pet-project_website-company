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

		const formData = new FormData(event.target);
		const acceptedForm = document.querySelector('.modal-product-order__accepted');

		let out = `
			<div class="form-accepted__accepted-img"></div>

			<div class="form-accepted__accepted-title"> 
				Ожидайте!
			</div>
			<p class="form-accepted__accepted-text text text__basis"> 
				Ваша заявка обрабатывается.
			</p>
		`;
		acceptedForm.innerHTML = out;

		// добавляю класс формы отправленно 
		// вывожу сообщение об отправке
		acceptedForm?.classList.remove('hidden');
		acceptedForm?.classList.add('load');

		setData('https://jsonplaceholder.typicode.com/posts', formData)
			.then(() => {

				acceptedForm?.classList.remove('load');
				acceptedForm?.classList.add('accepted');

				out = `
					<div class="form-accepted__accepted-img"></div>

					<div class="form-accepted__accepted-title"> 
						Спасибо!
					</div>
					<p class="form-accepted__accepted-text text text__basis"> 
						Ваша заявка принята. В&nbsp;ближайшее время с&nbsp;вами свяжется наш менеджер.
					</p>
				`;

				acceptedForm.innerHTML = out;
				/**
				 * пауза setTimeout
				 * очищаю форму
				 * удаляю сообщения об отправке
				 * закрываем форму
					 */
				setTimeout(() => {
					const modal = document.querySelector('#id-modal-product-order');

					// сбрасываю значения формы
					event.target.reset();

					if (modal?.classList.contains('is-open')) {
						MicroModal.close('id-modal-product-order');
					}

					acceptedForm?.classList.remove('accepted');
					acceptedForm?.classList.add('hidden');
				}, 3000);
			})
			.catch((data) => {
				acceptedForm?.classList.remove('load');
				acceptedForm?.classList.add('error');

				out = `
					<div class="form-accepted__accepted-img"></div>

					<div class="form-accepted__accepted-title"> 
						Произошла ошибка.
					</div>
					<p class="form-accepted__accepted-text text text__basis"> 
						Попробуйте повторить запрос позже.
					</p>
				`;

				acceptedForm.innerHTML = out;

				/**
				 * пауза setTimeout
				 * удаляю сообщения об ошибке
				 */
				setTimeout(() => {
					acceptedForm?.classList.add('hidden');
					acceptedForm?.classList.remove('error');
				}, 3000);
			})
	});



