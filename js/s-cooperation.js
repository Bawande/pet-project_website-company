

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

		const formData = new FormData(event.target);
		const messageWrapper = document.querySelector('.cooperation__message-status');

		let out = `
		<div class="message-status__img"></div>

		<div class="message-status__title"> 
			Ожидайте!
		</div>
		<p class="message-status__text text text__basis"> 
			Ваша заявка обрабатывается.
		</p>
		`;

		messageWrapper.innerHTML = out;

		// добавляю класс формы отправленно 
		// вывожу сообщение об отправке
		messageWrapper?.classList.remove('hidden');
		messageWrapper?.classList.add('load');

		setData('https://jsonplaceholder.typicode.com/posts', formData)
			.then(() => {

				messageWrapper?.classList.remove('load');
				messageWrapper?.classList.add('accepted');

				out = `
				<div class="message-status__img"></div>

				<div class="message-status__title"> 
					Спасибо!
				</div>
				<p class="message-status__text text text__basis"> 
					Ваша заявка принята. В&nbsp;ближайшее время с&nbsp;вами свяжется наш менеджер.
				</p>
				`;

				messageWrapper.innerHTML = out;
				/**
				 * пауза setTimeout
				 * очищаю форму
				 * удаляю сообщения об отправке
				 * закрываем форму
					 */
				setTimeout(() => {

					// сбрасываю значения формы
					event.target.reset();

					messageWrapper?.classList.remove('accepted');
					messageWrapper?.classList.add('hidden');
				}, 3000);
			})
			.catch((data) => {
				messageWrapper?.classList.remove('load');
				messageWrapper?.classList.add('error');

				out = `
				<div class="message-status__img"></div>

				<div class="message-status__title"> 
					Произошла ошибка.
				</div>
				<p class="message-status__text text text__basis"> 
					Попробуйте повторить запрос позже.
				</p>
			`;

				messageWrapper.innerHTML = out;

				/**
				 * пауза setTimeout
				 * удаляю сообщения об ошибке
				 */
				setTimeout(() => {
					messageWrapper?.classList.add('hidden');
					messageWrapper?.classList.remove('error');
				}, 3000);
			})


	});