const sidebarBox = document.querySelector('[data-menu-wrap]');
const sidebarItem = document.querySelectorAll('[data-menu-item]');
const toggleBtn = document.querySelector('[data-toggle-btn]');
const openBtn = document.querySelector('[data-open-btn]');
const closeBtn = document.querySelector('[data-close-btn]');
const pageWrapper = document.querySelector('[data-menu-overlay]');
const body = document.body;
const medda = false;



toggleBtn?.addEventListener('click', function (event) {
	toggleMenu();
})

openBtn?.addEventListener('click', function (event) {
	if (!sidebarBox?.classList.contains('active')) {
		showMenu();
	}
})

closeBtn?.addEventListener('click', function (event) {

	if (sidebarBox?.classList.contains('active')) {
		hideMenu();
	}
});

pageWrapper?.addEventListener('click', function (event) {

	if (sidebarBox?.classList.contains('active')) {
		toggleMenu();
	}
});


sidebarItem.forEach(el => {

	el.addEventListener('click', () => {

		if (sidebarBox?.classList.contains('active')) {
			toggleMenu();
		}
	})
});

window.addEventListener('keydown', function (event) {

	if (sidebarBox?.classList.contains('active') && event.key === "Escape") {
		toggleMenu();
	}
});

// Windows Screen Resizes Function
window.onresize = function () {

	if (medda && this.innerWidth > 991) {
		if (sidebarBox.classList.contains('active')) {
			hideMenu();
		}
	}
};

function hideMenu() {

	openBtn?.classList.remove('active');
	closeBtn?.classList.remove('active');
	toggleBtn?.classList.remove('active');
	sidebarBox?.classList.remove('active');
	pageWrapper?.classList.remove('active');
	body?.classList.remove('sb-stop-scroll');
};

function showMenu() {

	openBtn?.classList.add('active');
	closeBtn?.classList.add('active');
	toggleBtn?.classList.add('active');
	sidebarBox?.classList.add('active');
	pageWrapper?.classList.add('active');
	body?.classList.add('sb-stop-scroll');
};

// Show & Hide Toggle Menu Function
function toggleMenu() {

	openBtn?.classList.toggle('active');
	closeBtn?.classList.toggle('active');
	toggleBtn?.classList.toggle('active');
	sidebarBox?.classList.toggle('active');
	pageWrapper?.classList.toggle('active');
	body?.classList.toggle('sb-stop-scroll');
}

