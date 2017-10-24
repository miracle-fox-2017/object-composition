//your code here
"use strict"
const fs        = require(`fs`)
let options     = fs.readFileSync('./cookies.txt', 'utf-8').split('\r\n')

class Cookie {
    constructor(name, ingredients){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
    }

    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name, ingredients){
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    constructor(){

    }
    static create(options){
        let products = []
        let productName = []
        let productIngredients = []
        
        for (var i = 0; i < options.length; i ++){
            let split = options[i].split("=")
            productName.push(split[0])
            productIngredients.push(split[1])
        }
        
        let pB = new PeanutButter(productName[0],productIngredients[0]);
        let chocoChip = new ChocolateChip(productName[1],productIngredients[1]);
        let chocoCheese = new OtherCookie(productName[2],productIngredients[2]);
        let chocoButter = new OtherCookie(productName[3],productIngredients[3]);
        products.push(pB);
        products.push(chocoChip);
        products.push(chocoCheese);
        products.push(chocoButter);
        
        return products
    }

    static cookieRecommendation(day, batch){
        let diet = day
        let dietProducts = []
        if(diet = 'tuesday'){
            for(var i = 0; i < batch.length; i++){
                if(batch[i].ingredients.indexOf('sugar') === -1){
                    dietProducts.push(batch[i])
                }
            }
        }
       
        return dietProducts
    }
}


let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies[0].ingredients)

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday" , batch_of_cookies)
console.log("sugar free cakes are: ")
for(let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}


