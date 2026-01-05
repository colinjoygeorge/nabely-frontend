document.addEventListener('DOMContentLoaded', function() {
	// Control scroll based functionality of the header
	window.addEventListener("scroll", function() {
		headerScrollHandler();
	});

	// Call the scroll handler once
	headerScrollHandler();

	// Control the validity checing of password inputs for sign up
	if (document.title == "Sign Up For Nabely") {
		signupValidationHandler();
	}

	// Control the validity checing of password inputs for sign in
	if (document.title == "Sign In To Nabely") {
		signinValidationHandler();
	}

	// Control the filters on the dashboard
	if (document.title == "My Dashboard") {
		filterHandler();
	}

	// Control the year in the footer
	const footerText = document.querySelector("footer")
		.querySelector("p");
	footerText.innerText = `© ${new Date().getFullYear()} Nabely`;
});

// This function determines if the page can scroll vertically at all, and if so, it handles the header changing appearance
function headerScrollHandler() {
	const html = document.documentElement;
	const realHeader = document.getElementsByClassName("realHeader")[0];
	const navBar = document.getElementsByClassName("navBar")[0];
	const navBarUL = document.getElementsByClassName("navBar")[0].querySelector("ul");
	const logo = document.getElementsByClassName("logoLink")[0].querySelector("img");

	const scrollPosition = window.scrollY || window.pageYOffset;

	if (realHeader && navBar && navBarUL) {

		if (html.classList.contains("onePageDisplay")) {
			realHeader.style.backgroundColor = "var(--background)";
			realHeader.style.borderBottom = "2px solid var(--text)";
			logo.style.filter = "none";
		} else {
			if (scrollPosition === 0) {
				realHeader.style.backgroundColor = "transparent";
				realHeader.style.borderBottom = "2px solid transparent";
				logo.style.filter = "drop-shadow(1px 1px 0 var(--color5)) drop-shadow(-1px 1px 0 var(--color5)) drop-shadow(0.5px -0.5px 0 var(--color5))";
			} else {
				realHeader.style.backgroundColor = "var(--background)";
				realHeader.style.borderBottom = "2px solid var(--text)";
				logo.style.filter = "none";
			}
			if (navBar.getAttribute("data-expanded") == "false") {
				if (scrollPosition === 0) {
					navBarUL.style.backgroundColor = "transparent";
					navBarUL.style.borderBottom = "2px solid transparent";
				} else {
					navBarUL.style.backgroundColor = "var(--background)";
					navBarUL.style.borderBottom = "2px solid var(--text)";
				}
			}
		}
	}
}

// This function determines if specific inputs on the signup page are valid
function signupValidationHandler() {
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
	const passwordConfirmInput = document.getElementById('passwordConfirm');

	if (emailInput) {
		emailInput.addEventListener('input', function() {
			const isValidEmail = this.value.includes('@') && this.value.includes('.');

			if (isValidEmail) {
				this.classList.add('valid');
				passwordInput.classList.add('enabled');
			} else {
				this.classList.remove('valid');
				passwordInput.classList.remove('enabled', 'valid');
				passwordConfirmInput.classList.remove('enabled', 'valid');
			}
		});
	}

	if (passwordInput) {
		passwordInput.addEventListener('input', function() {
			const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!()-.?[\]_`~;:@#$%^&*+=]).{10,}$/.test(this.value);

			if (isValidPassword) {
				this.classList.add('valid');
				passwordConfirmInput.classList.add('enabled');
			} else {
				this.classList.remove('valid');
				passwordConfirmInput.classList.remove('enabled', 'valid');
			}
		});
	}
}

// This function confirms that the password confirmation field matches the initial password field
function validatePasswordConfirmation() {
	const password = document.getElementById('password')
		.value;
	const passwordConfirmInput = document.getElementById('passwordConfirm');
	const passwordConfirm = passwordConfirmInput.value;
	const submitButton = document.getElementById('submit');

	if (password === passwordConfirm) {
		passwordConfirmInput.classList.add('valid');
		submitButton.classList.add('enabled');
	} else {
		passwordConfirmInput.classList.remove('valid');
		submitButton.classList.remove('enabled');
	}
}

// This function determines if specific inputs on the signin page are valid
function signinValidationHandler() {
	const emailInput = document.getElementById('email');

	if (emailInput) {
		emailInput.addEventListener('input', function() {
			const isValidEmail = this.value.includes('@') && this.value.includes('.');
			if (isValidEmail) {
				this.classList.add('valid');
			} else {
				this.classList.remove('valid');
			}
		});
	}
}

// This function controls the filters on the dashboard
function filterHandler() {
    // Search Button
	const searchButton = document.getElementById('searchButton');

    // All Buttons
	const filterButtons = document.querySelectorAll(".filterButton");

    // Close Button Icon
	const closeFilertButtons = document.querySelectorAll(".closeFilter");

    // Specifically the Date Selector
	const dateSelector = document.getElementById("date");

    // Set minimum date for the Date Selector
	const currentDate = getCurrentDate();
	dateSelector.setAttribute("min", currentDate);

    // Add click detection for the buttons
	searchButton.addEventListener("click", () => changeState(searchButton));
	filterButtons.forEach((button) => button.addEventListener("click", () => changeState(button)));
	closeFilertButtons.forEach((button) => button.addEventListener("click", () => disableFilter(button)));

    // Get the current date
    function getCurrentDate() {
		const today = new Date();
		const year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();

		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		return `${year}-${month}-${day}`;
	}

    // Toggle a button's state from inactive to active
	function changeState(button) {
		if (button.getAttribute("data-active") == "false") {
			button.setAttribute("data-active", "true");
			// if (button.id == "settingFilter" || button.id == "interactionFilter") {
			// 	updateFilterTags(button, 'default', 'oneOnly');
			// } else if (button.id == "priceFilter" || button.id == "distanceFilter") {
			// 	updateFilterTags(button, 'default', 'anyUnder');
			// } else if (button.id == "dateFilter") {
			// 	updateFilterTags(button, 'date', 'anyOver');
			// } else if (button.id == "accessibilityFilter") {
			// 	updateFilterTags(button, 'checkbox', 'all');
			// } else if (button.id == "searchButton") {
			// 	const dateFilter = document.getElementById("dateFilter");
			// 	updateFilterTags(dateFilter, 'date', 'anyOver');

			// 	const priceFilter = document.getElementById("priceFilter");
			// 	updateFilterTags(priceFilter, 'default', 'anyUnder');

			// 	const distanceFilter = document.getElementById("distanceFilter");
			// 	updateFilterTags(distanceFilter, 'default', 'anyUnder');

			// 	const settingFilter = document.getElementById("settingFilter");
			// 	updateFilterTags(settingFilter, 'default', 'oneOnly');

			// 	const interactionFilter = document.getElementById("interactionFilter");
			// 	updateFilterTags(interactionFilter, 'default', 'oneOnly');

			// 	const accessibilityFilter = document.getElementById("accessibilityFilter");
			// 	updateFilterTags(accessibilityFilter, 'checkbox', 'all');
			// }
		}
		// filterResults();
	}

    // Toggle a button's state from active to inactive
	function disableFilter(button) {
		const filter = button.parentElement.parentElement;
		setTimeout(() => {
			filter.setAttribute("data-active", "false");
			filter.setAttribute("data-currentFilter", "");
			// filterResults();

			if (filter.id == "searchButton") {
				const dateFilter = document.getElementById("dateFilter");
				dateFilter.setAttribute("data-currentFilter", "");
	
				const priceFilter = document.getElementById("priceFilter");
				priceFilter.setAttribute("data-currentFilter", "");
	
				const distanceFilter = document.getElementById("distanceFilter");
				distanceFilter.setAttribute("data-currentFilter", "");
	
				const settingFilter = document.getElementById("settingFilter");
				settingFilter.setAttribute("data-currentFilter", "");
	
				const interactionFilter = document.getElementById("interactionFilter");
				interactionFilter.setAttribute("data-currentFilter", "");
	
				const accessibilityFilter = document.getElementById("accessibilityFilter");
				accessibilityFilter.setAttribute("data-currentFilter", "");

				// filterResults();
			}
		}, 100);
	}
}

// // This function determines what tags to filter when a filter is used
// function updateFilterTags(filter, type, amount) {
// 	// console.log(`Filter ${filter}: Type ${type}`);
// 	if (type == "default") {
// 		if (amount == "oneOnly") {
// 			const value = filter.querySelector("select").value;
// 			// console.log(`Showing results with tag: ${value}`);
// 			filter.setAttribute("data-currentFilter", value);
// 		} else if (amount == "anyUnder") {
// 			const options = filter.querySelector("select").querySelectorAll("option");
// 			const optionValues = Array.from(options).map(option => option.value).slice(1);
// 			const indexOfFilterValue = optionValues.indexOf(filter.querySelector("select").value);
// 			const optionList = optionValues.slice(0, indexOfFilterValue + 1);
// 			// console.log(`Showing results with tag(s): ${optionList}`);
// 			filter.setAttribute("data-currentFilter", optionList.join(' '));
// 		}
// 	} else if (type == "date") {
// 		const value = filter.querySelector("input").value;
// 		// console.log(`Showing results with tag(s) on or after: ${value}`);
// 		filter.setAttribute("data-currentFilter", value);
// 	} else if (type == "checkbox") {
// 		const options = filter.querySelectorAll("input:checked");
// 		const optionValues = Array.from(options).map(checkbox => checkbox.value);
// 		// console.log(`Showing results with tag(s): ${optionValues}`);
// 		filter.setAttribute("data-currentFilter", optionValues.join(' '));
// 	}
// 	filterResults();
// }

// // This function actually filters the results
// function filterResults() {
// 	var filterList = [];
// 	const filters = document.querySelectorAll(".tagFilter");
// 	filters.forEach((filter) => {
// 		const currentFilterValue = filter.getAttribute("data-currentFilter");
// 		const activeFilter = filter.getAttribute("data-active");
		
// 		const filterValues = currentFilterValue.split(/\s+/).filter(value => value !== '');
		
// 		if (activeFilter) {
// 			filterValues.forEach(value => {
// 				if (!filterList.includes(value)) {
// 					filterList.push(value);
// 				}
// 			});
// 		}
// 	});
// 	console.log(filterList);
// 	hideResults(filterList);
// }

// // This function hides the results that get filtered out
// function hideResults(filterList) {
// 	const events = document.querySelectorAll(".event");
// 	events.forEach((event) => {
// 		const eventTags = event.getAttribute("data-tags").split(/\s+/);
// 	});
// }