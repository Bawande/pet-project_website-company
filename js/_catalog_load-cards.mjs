
export default loadInitialCards;

const loadMoreButton = document.querySelector("[data-load-more-button]");

let initialItems = 6;
let loadItems = 3;


function loadInitialCards(arrCards = [], loadMore = false) {

	console.log(arrCards)
	// const cards = JSON.parse(localStorage.getItem("product"));
	const cardsWrapper = document.querySelector(".catalog-product__cards-list");
	let currentInitial = initialItems;
	let currentDisplayedItems = 0;
	let counter = 0;

	let out = '';

	if (loadMore) {

		currentDisplayedItems = document.querySelectorAll('[data-product-card-article]').length;
		currentInitial = Math.max(initialItems, currentDisplayedItems) + loadItems;
		if (currentDisplayedItems) {
			out = cardsWrapper?.innerHTML;
		}
	}

	for (let card of arrCards) {
		if (
			counter >= currentDisplayedItems
			&& counter < currentInitial
		) {
			out += `
				<!-- card -->
				<div class="catalog-product__card product-card" data-product-card-article="${card.id}" style="opacity: 0;">

					<div class="product-card__img-wrap">
						<div class="product-card__img-container">
							<img src="./catalog/${card.id}/${card.images[0]}" alt="${card.name}">
						</div>
					</div>

					<div class="product-card__description-wrap">
						<div class="product-card__description">
							<span class="text text__basis">
								${card.name}
							</span>
						</div>

						<div class="product-card__btn-order">
							<span class="link">Заказать</span>
						</div>
					</div>

				</div>
			`;
		}
		counter++;
	}


	cardsWrapper.innerHTML = out;

	const container = document.createElement('div');
	cardsWrapper.after(container, loadMoreButton);
	loadMoreButton.style.display = "block";

	console.log(currentInitial, ' ', arrCards.length)

	if (currentInitial >= arrCards.length) {
		loadMoreButton.style.display = "none";
	}

	fadeLoadCards();
}


function fadeLoadCards() {

	const loadCards = document.querySelectorAll('[data-product-card-article]');

	loadCards.forEach(el => {
		if (el.style.opacity == 0) {

			let opacity = 0;

			const interval = setInterval(function () {
				if (opacity <= 1) {
					opacity = opacity + 0.2;
					el.style.opacity = opacity;
				} else {
					clearInterval(interval);
				}
			}, 10);
		}

	})
}
