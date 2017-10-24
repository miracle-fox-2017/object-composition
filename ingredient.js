'use strict'

class Ingredients{
	constructor(){
		// this.name = options['name']
		// this.amount = options['amount']
		// this.has_sugar = options['has_sugar']
		this._name = []
		this._amount = []
		this.has_sugar = false
	}

	split_ingredient(str){
		let hasil = []
		let bahan = []

		str.forEach(item =>{
			hasil.push(item.split(':'))
		})

		hasil.forEach(element =>{
			this._name.push(element[1])
			this._amount.push(element[0].slice(0,2))
		})

		bahan.push(this._amount, this._name)
		return bahan
	}

	cek_sugar(){
		this._name.forEach(sugar=>{
			if(sugar.trim() == 'sugar'){
				this.has_sugar = true
			}
		})

		return this.has_sugar
	}

}

module.exports = Ingredients

// let ingredients = new Ingredients() 
// console.log(ingredients.split_ingredient([ ' 1 cup : flour',
//        ' 2 cups : sugar',
//        ' 2 cups : cinnamon',
//        ' 1 tlbsp : butter' ]))

// console.log(ingredients.cek_sugar())