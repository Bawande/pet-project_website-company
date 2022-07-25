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
	// формирую список для вывода в браузер
	filters.forEach((el, ind) => {
		out += `
		<li class="filter__item teg">
			<input type="radio" id="${filter}ID${ind}" name="${filter}" ${(ind === 0 ? "checked" : "")}>
			<label for="${filter}ID${ind}">${el}</label>
		</li>
		`;
	})
	// вывожу в браузер
	filtersWrapper.innerHTML = out;
	// console.log(filtersWrapper)
}

