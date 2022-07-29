/**
 * функция логики работы выподающего меню фильтров 
 */
export default function filtersDropDownMenu() {

	const overlayBackground = document.querySelector('[data-menu-overlay]');
	const documentBody = document.body;

	// открытие меню
	const dropDownMenuOpen = () => {

		document.querySelectorAll('[data-btn-droplist]')
			.forEach(btn => {
				btn.addEventListener('click', event => {
					if (!event.target.classList.contains('hidden')) {
						const filterName = event.target.dataset.btnDroplist;
						const filtersWrapper = document.querySelector(`[data-filter-list="${filterName}"]`)

						filtersWrapper.classList.remove('hidden');
						documentBody?.classList.add('sb-stop-scroll');
						overlayBackground?.classList.add('active');
					}
				})
			})
	}
	dropDownMenuOpen();

	// смена селектора меню
	const dropDownMenuSelected = () => {

		document.querySelectorAll('[data-filter]')
			.forEach((area) => {
				area.addEventListener('click', event => {
					const mobile = area.querySelector('.filter__list.mobile')
					if (mobile) {
						if (event.target.closest('input[type=radio] ~ label')) {
							const btnDropList = area.querySelector('[data-btn-droplist]');
							const contentSelectorEvent = event.target.innerText;

							// смена значения кнопки при клики на селектор
							btnDropList.innerHTML = contentSelectorEvent;
							console.log(contentSelectorEvent);
						}
					}
				})

			})
	}

	dropDownMenuSelected();

	const dropDownMenuClose = () => {

		// закрытие по выбору селектора
		document.querySelectorAll('[data-filter-list]')
			.forEach((list) => {
				list.addEventListener('click', (event) => {
					if (list.classList.contains('mobile') && !list.classList.contains('hidden')) {
						if (event.target.closest('input[type=radio] ~ label')) {
							const filtersWrapper = list;

							filtersWrapper.classList.add('hidden');
							documentBody?.classList.remove('sb-stop-scroll');
							overlayBackground?.classList.remove('active');
						}
					}
				})
			})

		// закрытие по нажатию клавиши esc
		window.addEventListener('keydown', function (event) {

			if (event.key === "Escape") {
				document.querySelectorAll('[data-filter-list]')
					.forEach((list) => {
						if (!list.classList.contains('hedden')) {
							const filtersWrapper = list;

							filtersWrapper.classList.add('hidden');
							documentBody?.classList.remove('sb-stop-scroll');
							overlayBackground?.classList.remove('active');
						}
					})
			}
		});
	}

	dropDownMenuClose();

}