'use strict'
const Ingredients = require('./ingredient')


class Cookie{
	constructor(name, arr_ingredients){
		let ingredients = new Ingredients()
		this.name = name
		this.status = "mentah"
		this.ingredients = ingredients.split_ingredient(arr_ingredients)
		this.has_sugar = ingredients.cek_sugar()
	}

	bake(){
		this.status = "selesai dimasak"
		console.log('oke')
	}
}



module.exports = Cookie

// let cookie = new Cookie('tes', [ ' 1 cup : flour',
//        ' 2 cups : sugar',
//        ' 2 cups : cinnamon',
//        ' 1 tlbsp : butter' ])
// console.log(cookie)