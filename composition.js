//your code here
let fs = require('fs');
class Cookie {
	constructor(name,ingredients){
		this.name = name;
		this.status = "mentah"
		this.ingredients = ingredients;
		this.has_sugar = this.checkSugar()
	}

	checkSugar(){
		for(let i = 0 ; i<this.ingredients.length ; i++ ){
			if(this.ingredients[i].name.trim() === "sugar"){
				return true;
			}
		}
		return false;
	}
	bake(){
		this.status = "selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	constructor(name,ingredients){
		super(name,ingredients)
		this.peanut_count = 100
	}
}

class ChocholateChip extends Cookie{
	constructor(name,ingredients){
		super(name,ingredients)
		this.choc_chip_count = 200;

	}
}

class Chocolatecheese extends Cookie{
	constructor(name,ingredients){
		super(name,ingredients)
		this.choc_chip_count = 200;

	}
}

class Chocolatebutter extends Cookie{
	constructor(name,ingredients){
		super(name,ingredients)
		this.choc_chip_count = 200;

	}
}

class CookieFactory {
	static create(options){
		let factory = []
		let ingredients;
		for (let i = 0 ; i<options.length ; i++){
			let newOptions = options[i].split("=");
			// var a = newOptions[1].split(",")
			// console.log(a[0].split(":"))
			if(newOptions[0].trim() === 'peanut butter'){
				let peanutButter = new PeanutButter('peanut butter',this.convertObj(newOptions[1].split(",")))
				factory.push(peanutButter)
			}
			if(newOptions[0].trim() === 'chocolate chip'){
				let chocholateChip = new ChocholateChip('chocholate chip',this.convertObj(newOptions[1].split(",")))
				factory.push(chocholateChip)
			}
			if(newOptions[0].trim() === 'chocolatecheese'){
				let chocolatecheese = new Chocolatecheese('chocolatecheese',this.convertObj(newOptions[1].split(",")))
				factory.push(chocolatecheese)
			}
			if(newOptions[0].trim() === 'chocolatebutter'){
				let chocolatebutter = new Chocolatebutter('chocolatebutter',this.convertObj(newOptions[1].split(",")))
				factory.push(chocolatebutter)
			}			
		}
	return factory;	
	}
	static convertObj(arr){
		let newArr = []
		for (let i = 0 ; i<arr.length ; i++){
			let ingredients = new Ingredients(arr[i].split(":"))
			newArr.push(ingredients);
		}
		return newArr
	}

	static cookieRecommendation(day, objIng){
		let arr = [];
		for (let i = 0 ; i<objIng.length ; i++){
			if(objIng[i].has_sugar !== true){
				arr.push(objIng[i])
			}
		}
		return arr;
	}
}

class Ingredients {
	constructor(options){
		this.name = options[1]
		this.amount = options[0]
		// this.has_sugar = true
	}
}
let options = fs.readFileSync("cookies.txt").toString().split("\n");
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are : ");
for (let i = 0; i< sugarFreeFoods.length; i++){
	console.log(sugarFreeFoods[i].name);
}