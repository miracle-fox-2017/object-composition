"use strict"
const fs = require('fs');

class Ingredient {
  constructor(options) {
    this.name = options.name
    this.amount = options.amount
    this.has_sugar = options.has_sugar
  }
}

class Cookie {
  constructor() {
    this.status = 'mentah'
    this.ingredients = []
  }

  bake (){
    this.status = 'selesai dimasak'
  }

}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super()
    this.name = name
    this.peanut_count = 100
    this.ingredients = ingredients
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super()
    this.name = name
    this.choc_chip_count = 200
    this.ingredients = ingredients
  }
}

  class OtherCookie extends Cookie {
    constructor(name, ingredients) {
      super()
      this.name = name
      this.other_count = 150
      this.ingredients = ingredients
    }
  }

class CookieFactory {
  static create(options){
    let result = []
    let parsing = fs.readFileSync(options).toString().split('\n');
    let cookieCompositions = []
    parsing.forEach(dataCookie => {
      cookieCompositions.push(dataCookie.split('='))
    })

    cookieCompositions.forEach(getKeys => {
      if(getKeys.length > 1) {
        let splitComposition = getKeys[1].split(',')
        let listComposition = []
        splitComposition.forEach( getList =>{
          listComposition.push(getList.split(':'))
        })
        let all_ingredients = [];
        let cookieName = getKeys[0].trim()
        if(cookieName === 'peanut butter'){
          listComposition.forEach(list =>{
            let sugar = list[1].trim()
            let status_sugar = (sugar === 'sugar')? true : false
             all_ingredients.push(new Ingredient({
               name: list[1],
               amount: list[0],
               has_sugar: status_sugar
             }));
           })
           result.push(new PeanutButter(cookieName, all_ingredients))
        } else if(cookieName === 'chocolate chip'){
          listComposition.forEach(list =>{
            let sugar = list[1].trim()
            let status_sugar = (sugar === 'sugar')? true : false
             all_ingredients.push(new Ingredient({
               name: list[1],
               amount: list[0],
               has_sugar: status_sugar
             }));
           })
           result.push(new ChocolateChip(cookieName, all_ingredients))
        } else{
          listComposition.forEach(list =>{
            let sugar = list[1].trim()
            let status_sugar = (sugar === 'sugar')? true : false
             all_ingredients.push(new Ingredient({
               name: list[1],
               amount: list[0],
               has_sugar: status_sugar
             }));
           })
           result.push(new OtherCookie(cookieName, all_ingredients))
        }
      }
    })
    return result
  }

  static cookieRecommendation(day, listCookie){
    let result = []
    if(day === 'tuesday'){
      listCookie.forEach(getCookies =>{
        let sugar = false;
        getCookies.ingredients.forEach(getIngredient =>{
          if(getIngredient.has_sugar){
            sugar = true
          }
        })
        if(!sugar){
          result.push(getCookies)
        }
      })
    } else {
      console.log('You can eat anything !!!');
    }
    return result
  }
}

let bath_of_cookies = CookieFactory.create('cookies0.txt')
console.log(bath_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", bath_of_cookies);
console.log("sugar free cakes are :");
sugarFreeFoods.forEach( listCookie =>{
  console.log(listCookie.name);
})
