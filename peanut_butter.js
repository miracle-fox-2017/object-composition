'use strict'
const Cookie = require('./cookie')

class PeanutButter extends Cookie {
	constructor(name, ingredients){
		super(name, ingredients)
		this.peanut_count = 100
	}
}

// let peanut = new PeanutButter('oke')
// console.log(peanut)

module.exports = PeanutButter