
export default loadInitialCards;

const cardsWrapper = document.querySelector(".catalog-product__cards-list");
const loadMoreButton = document.querySelector("[data-load-more-button]");

let initialItems = 6;
let loadItems = 3;


function loadInitialCards(loadMore = false) {

	const cards = JSON.parse(localStorage.getItem("product"));
	const currentDisplayedItems = document.querySelectorAll('[data-product-card-article]').length;
	const current = Math.max(initialItems, currentDisplayedItems) + ((loadMore) ? loadItems : 0);
	let out = '';
	let counter = 0;
	// console.log(current);
	// console.log(document.querySelectorAll('[data-product-card-article]'));

	if (currentDisplayedItems) {
		out = cardsWrapper.innerHTML;
	}

	for (let card of cards) {
		if (
			counter >= currentDisplayedItems &&
			counter < current
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

	if (current >= cards.length) {
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
