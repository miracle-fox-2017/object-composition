"use strict"
var fs = require('fs');

//your code here
class Ingredient {
	constructor(options) {
		this.name = options['name'];
		this.amount = options['amount'];
		this.has_sugar = options['has_sugar'];
	}

	// Extra
}

class Cookie{
	constructor(name, ingredients) {
		this.name = name;
		this.status = "mentah";
		this.ingredients = ingredients;
	}

	bake() {
		this.status = "selesai dimasak";
	}
}

class PeanutButter extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.peanut_count = 100;
	}
}

class ChocolateChip extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.choc_chip_count = 200;
	}
}

class OtherCookie extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.other_count = 150;
	}
}

class CookieFactory {
	constructor() {
		this.producedCookies = [];
	}

	static create(options) {
		let arrCookieFactory = [];
		let cookieData = fs.readFileSync('cookies.txt');
		let arrCookies = cookieData.toString().split('\n');

		for (var i = 0; i < arrCookies.length; i++) {
			let cookieName = arrCookies[i].split('=');
			let ingredientsList = cookieName[1].split(',');

			if (cookieName[0] === 'peanut butter') {
				arrCookieFactory.push(new PeanutButter(cookieName[0], CookieFactory.getIngredientList(ingredientsList)));
			} else if (cookieName[0] === 'chocolate chip') {
				arrCookieFactory.push(new ChocolateChip(cookieName[0], CookieFactory.getIngredientList(ingredientsList)));
			} else {
				let optOtherCookie = [];
				arrCookieFactory.push(new OtherCookie(cookieName[0], CookieFactory.getIngredientList(ingredientsList)));
			}
		}

		this.producedCookies = arrCookieFactory;

		return arrCookieFactory;
	}

	static ingredientToString(ingredients) {
		let strIngredients = '';

		for (var i = 0; i < ingredients.length; i++) {
			strIngredients += `${ingredients[i].name} : ${ingredients[i].amount} `;
		}

		return strIngredients;
	}

	static getIngredientList(arrIngredient) {
		let arrObjIngredients = [];

		for (var i = 0; i < arrIngredient.length; i++) {
			let ingredientItem = arrIngredient[i].split(':');
			let ingredientAmount = ingredientItem[0];
			let ingredientName = ingredientItem[1];
			let hasSugar = ingredientName.replace(/ /g,'') === 'sugar';
			let objParam = {};
			objParam.name = ingredientName;
			objParam.amount = ingredientAmount;
			objParam.has_sugar = hasSugar;


			arrObjIngredients.push(new Ingredient(objParam))
		}		

		return arrObjIngredients;				  
	}

	static cookieRecommendation(day, batchCookie = this.producedCookies) {
		let cookieResult = [];

		for (var i = 0; i < batchCookie.length; i++) {	
			if (day === "tuesday") {
				if (CookieFactory.hasSugar(batchCookie[i].ingredients) === false) {
					cookieResult.push(batchCookie[i]);
				}
			} else {
				cookieResult.push(batchCookie[i]);
			}
		}

		return cookieResult;
	}

	static hasSugar(ingredients) {
		let hasSugar = false;

		for (var i = 0; i < ingredients.length; i++) {
			if (ingredients[i].has_sugar === true) {
				hasSugar = true;
			}
		}

		return hasSugar;
	}
}

let allCookies = [];
let batch_of_cookies = CookieFactory.create(allCookies);
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);

for (var s = 0; s < sugarFreeFoods.length; s++) {
	console.log(sugarFreeFoods[s].name)
}
