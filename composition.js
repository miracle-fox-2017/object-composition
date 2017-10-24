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

	}

	static create(options) {
		let arrCookieFactory = [];
		let cookieData = fs.readFileSync('cookies.txt');
		let arrCookies = cookieData.toString().split('\n');

		// console.log(arrCookies);

		for (var i = 0; i < arrCookies.length; i++) {
			let cookieName = arrCookies[i].split(' ');

			if (cookieName[0] === 'peanut' && cookieName[1] === 'butter') {
				let optPeanutCookie = [];
				optPeanutCookie.push(new Ingredient({ name: 'flour', amount: '1 cup', has_sugar: false }));
				optPeanutCookie.push(new Ingredient({ name: 'sugar', amount: '2 cups (gluten)', has_sugar: true }));
				optPeanutCookie.push(new Ingredient({ name: 'peanut butter', amount: '2 cups', has_sugar: false }));
				optPeanutCookie.push(new Ingredient({ name: 'butter', amount: '2 tsp', has_sugar: false }));

				arrCookieFactory.push(new PeanutButter(arrCookies[i], optPeanutCookie));
			} else if (cookieName[0] === 'chocolate' && cookieName[1] === 'chip') {
				let optChocolateCookie = [];
				optChocolateCookie.push(new Ingredient({ name: 'chip', amount: '1 cup', has_sugar: false }));
				optChocolateCookie.push(new Ingredient({ name: 'sugar', amount: '1 cups', has_sugar: true }));
				optChocolateCookie.push(new Ingredient({ name: 'butter', amount: '2 tsp', has_sugar: false }));

				arrCookieFactory.push(new ChocolateChip(arrCookies[i], optChocolateCookie));
			} else {
				let optOtherCookie = [];
				optOtherCookie.push(new Ingredient({ name: 'flour', amount: '1 cup', has_sugar: false }));
				optOtherCookie.push(new Ingredient({ name: 'sugar', amount: '1 cups', has_sugar: true }));
				optOtherCookie.push(new Ingredient({ name: 'cinnamon', amount: '2 tsp', has_sugar: false }));

				arrCookieFactory.push(new OtherCookie(arrCookies[i], optOtherCookie));
			}
		}


		// console.log(arrCookieFactory);
		let strCokieTxt = "";

		// for (var j = 0; j < 3; j++) {
		// 	strCokieTxt +=  arrCookieFactory[j].name+" = "+CookieFactory.ingredientToString(arrCookieFactory[j].ingredients)+"\n";		
		// }

		// console.log(strCokieTxt);
		// fs.writeFileSync('cookie.txt', strCokieTxt, 'utf-8');

		return strCokieTxt;
	}

	static ingredientToString(ingredients) {
		let strIngredients = '';

		for (var i = 0; i < ingredients.length; i++) {
			strIngredients += `${ingredients[i].name} : ${ingredients[i].amount} `;
		}

		return strIngredients;
	}
}

let allCookies = [];
let batch_of_cookies = CookieFactory.create(allCookies);
console.log(batch_of_cookies);
