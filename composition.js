"use strict"
var fs = require('fs');

//your code here
class Cookie{
	constructor() {
		this.status = "mentah"
	}

	bake() {
		this.status = "selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	constructor() {
		super();
		this.peanut_count = 100;
	}
}

class ChocolateChip extends Cookie {
	constructor() {
		super();
		this.choc_chip_count = 200
	}
}

class OtherCookie extends Cookie {
	constructor() {
		super();
		this.other_count = 50
	}
}

class CookieFactory {
	constructor() {

	}

	static create(options) {
		let arrCookieFactory = [];
		let cookieData = fs.readFileSync(options.file);
		let arrCookies = cookieData.toString().split('\n');

		for (var i = 0; i < arrCookies.length; i++) {
			let cookieName = arrCookies[i].split(' ');

			if (cookieName[0] === 'peanut') {
				arrCookieFactory.push(new PeanutButter(arrCookies[i]));
			} else if (cookieName[0] === 'chocolate' && cookieName[1] === 'chip') {
				arrCookieFactory.push(new ChocolateChip(arrCookies[i]));
			} else {
				arrCookieFactory.push(new OtherCookie(arrCookies[i]));
			}
		}

		return arrCookieFactory;
	}
}

let options = {};
options.file = 'cookies.txt';
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);