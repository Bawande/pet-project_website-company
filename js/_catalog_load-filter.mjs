export default loadInitialFilters;


function loadInitialFilters(containerSelector, filter) {

	const filters = [];
	const filtersWrapper = document.querySelector(`${containerSelector}`);
	let out = '';


	// заполняю массив фильтров
	JSON.parse(localStorage.getItem("product")).forEach(element => {
		const arr = element[filter];
		arr.forEach(el => {
			if (filters.indexOf(el) == -1) {
				filters.push(el)
			}
		})
	});

	// создание кнопки открытия выпадающего списка
	const btnDropList = document.createElement("button");
	// определение параметров кнопки открытия выпадающего списка
	btnDropList.classList.add('filter__btn-droplist', 'hidden');
	btnDropList.setAttribute('data-btn-droplist', filter)
	btnDropList.innerText = filters[0];
	// btnDropList.style.display = 'none';
	// вывод кнопки открытия выпадающего списка
	filtersWrapper.before(btnDropList)


	// формирую список для вывода на страницу
	filters.forEach((el, ind) => {
		out += `
		<li class="filter__item teg">
			<input type="radio" id="${filter}ID${ind}" name="${filter}" ${(ind === 0 ? "checked" : "")}>
			<label for="${filter}ID${ind}">${el}</label>
		</li>
		`;
	})
	// вывод на страницу
	filtersWrapper.innerHTML = out;
	filtersWrapper.dataset.filterList = filter;
	// console.log(filtersWrapper)
}

