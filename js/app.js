// BUDGET CONTROLLER

let budgetController = (function() {
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,
		},
	};

	return {
		addItem: function(type, des, val) {
			let newItem, ID;

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new item vased on 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},

		testing: function() {
			console.log(data);
		},
	};
})();

// UI CONTROLLER

let UIController = (function() {
	let DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
	};
	const { inputType, inputDescription, inputValue, inputBtn } = DOMstrings;
	return {
		getInput: function() {
			return {
				type: document.querySelector(inputType).value, // Will be either inc or exp
				description: document.querySelector(inputDescription).value,
				value: document.querySelector(inputValue).value,
			};
		},

		addListItem: function(obj, type) {
			// Create HTML string with placeholder text
			// Replace the placeholder text with some actual data
			// Insert the HTMl into the DOM
		},

		getDOMstrings: function() {
			return DOMstrings;
		},
	};
})();

// GLOBAL APP CONTROLLER

let controller = (function(budgetCtrl, UICtrl) {
	let setupEventListeners = function() {
		let DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {
			if (event.keyCode === 13) {
				ctrlAddItem();
			}
		});
	};

	let ctrlAddItem = function() {
		let input, newItem;
		// 1. Get the field input data
		input = UICtrl.getInput();
		console.log(input);
		// 2. Add the item to the budget controller

		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. Add the item to the UI
		// 4. Calculate the budget
		// 5. Display the budget on the UI
	};

	return {
		init: function() {
			setupEventListeners();
		},
	};
})(budgetController, UIController);

controller.init();
