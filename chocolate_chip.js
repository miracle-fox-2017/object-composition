'use strict'
const Cookie = require('./cookie')

class ChocolateChip extends Cookie{
	constructor(name, ingredients){
		super(name, ingredients)
		this.choc_chip_count = 200
	}
}

module.exports = ChocolateChip


// let cokiie = new ChocolateChip('tes', [ ' 1 cup : flour',
//   ' 2 cups (gluten) : sugar',
//   ' 2 cups : peanut butter',
//   ' 1 cup : cinnamon',
//   ' 2 tsp : butter' ])

// console.log(cokiie)
