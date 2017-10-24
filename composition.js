//your code here
const fs = require('fs')

class Cookie {
	constructor(name, ingredient, sugarSign) {
		this.name       = name
		this.status     = 'mentah'
		this.ingredient = ingredient
		this.has_sugar  = sugarSign
	}

	bake() {
		this.status = 'selesai dimasak'
	}
}

class PeanutButter extends Cookie {
	constructor(name, ingredient, sugarSign) {
		super(name, ingredient, sugarSign)
		this.peanut_count = 100
	}
}

class ChocolateChip extends Cookie {
	constructor(name, ingredient, sugarSign) {
		super(name, ingredient, sugarSign)
		this.choc_chip_count = 200
	}

	// methods
}

class OtherCookie extends Cookie {
	constructor(name, ingredient, sugarSign) {
		super(name, ingredient, sugarSign)
		this.other_count = 150
	}

	// methods
}

class Ingredient{
	constructor(option){
		this.name = option[1]
		this.amount = option[0]
	}
}

class CookieFactory {
	static create(option){
		let cookiesWithIngredient = fs.readFileSync(option).toString().split('\n')
		let cookie = []
		let ingredient = []
		let tempBahan = []
		let tempBahanPisa = []
		let resultIngredient = []
		let result = []
		let sugarSign = false

		cookiesWithIngredient.forEach((kue, index) =>{
			// console.log(kue.split('='));
			cookiesWithIngredient[index] = kue.split('=')
			cookie.push(cookiesWithIngredient[index][0])
			cookiesWithIngredient[index].splice(0,1)
			ingredient.push(cookiesWithIngredient[index])
		})

		ingredient.forEach(bahan =>{
			
			tempBahan.push(bahan[0].split(','));
			
		})

		tempBahan.forEach((bahanBaku, index) =>{
			tempBahanPisa[index] = []
			bahanBaku.forEach( bahanPisa =>{
				tempBahanPisa[index].push(bahanPisa.split(':'))
			})
		})


		cookie.forEach((kue, index) =>{
			resultIngredient = []
			sugarSign = false
			if(kue === 'peanut butter '){
				tempBahanPisa[index].forEach(bahanPeanut =>{
					if(bahanPeanut[1] === ' sugar'){
						sugarSign = true
					}
					resultIngredient.push(new Ingredient(bahanPeanut))
				})
				result.push(new PeanutButter(kue, resultIngredient, sugarSign))	
			}else
				if(kue === 'chocolate chip '){
					tempBahanPisa[index].forEach(bahanChocolate =>{
						if(bahanChocolate[1] === ' sugar'){
							sugarSign = true
						}
						resultIngredient.push(new Ingredient(bahanChocolate))
					})
					result.push(new ChocolateChip(kue, resultIngredient, sugarSign))	
				}else{
					tempBahanPisa[index].forEach(bahanOther =>{
						if(bahanOther[1] === ' sugar'){
							sugarSign = true
						}
						resultIngredient.push(new Ingredient(bahanOther))
					})
					result.push(new OtherCookie(kue, resultIngredient, sugarSign))	
				}			
		})

		return result
	}

	static cookieRecommendation(day, option){

		if(day === 'tuesday'){
			return option.filter(nonGula =>{
				return nonGula.has_sugar === false
			})	
		}else{
			return option.filter(nonGula =>{
				return nonGula.has_sugar === true
			})
		}
	}
}

let batch_of_cookies = CookieFactory.create('cookies.txt')
// console.log(batch_of_cookies[0]);
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
let sugarInFoods = CookieFactory.cookieRecommendation('sunday', batch_of_cookies)
// console.log(sugarFreeFoods);
console.log('cake in tuesday are : ');
sugarFreeFoods.forEach(nonGula =>{
	console.log(nonGula.name);
})

console.log('cake in sunday are : ');
sugarInFoods.forEach(withGula =>{
	console.log(withGula.name);
})