const scrolling = () => {
	document.querySelectorAll('a[href*="#$"]')
		.forEach(link => {
			// console.log(link)
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const linkBlockId = link.getAttribute('href').slice(1);
				const el = document.getElementById(`${linkBlockId}`)
				el.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			})
		})
}

scrolling();

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


async function setData(url, data) {

	const response = await fetch(url, {
		method: 'POST',
		body: data,
	})

	if (!response.ok) {
		throw new Error(`Error ${url}, status ${response}`)
	}

	return await response.json()
}










