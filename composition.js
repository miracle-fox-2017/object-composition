'use strict'

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

class Cookie {
  constructor(cookieName,ingredients) {
    this.name = cookieName
    this.status = 'mentah'
    this.ingredients = ingredients
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(cookieName,ingredients) {
    super(cookieName,ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(cookieName,ingredients) {
    super(cookieName,ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(cookieName,ingredients) {
    super(cookieName,ingredients)
    this.other_count = 150
  }
}

class CookieFactory {
  constructor() {

  }

  static create(options){
    let cookiesData = this.processName(options) // memanggil dan menyimpan name & ingredient
    let cookies = []
    for (let i = 0; i < cookiesData.length; i++) {
      switch (cookiesData[i][0]) {
        case 'peanut butter':
          cookies.push(new PeanutButter(cookiesData[i][0],cookiesData[i][1]))
          break;
        case 'chocolate chip':
          cookies.push(new ChocolateChip(cookiesData[i][0],cookiesData[i][1]))
          break;
        default:
          cookies.push(new OtherCookie(cookiesData[i][0],cookiesData[i][1]))
          break;
      }
    }
    return cookies
  }

  static processName(options) { // get name
    let cookiesData = []
    for (var i = 0; i < options.length; i++) {
      let option = options[i].split(' = ')
      let ingredients = this.processIngredient(option[1]) // get ingredients
      cookiesData.push([option[0],ingredients]);
    }
    return cookiesData
  }

  static processIngredient(ingred) { // get ingredients
    let objIng
    let tempIng = []
    let ingredient = ingred.split(', ')
    for (var i = 0; i < ingredient.length; i++) {
      let ingDetail = ingredient[i].split(' : ');
      if(ingDetail[1] == 'sugar'){
        objIng = {
          name : ingDetail[1],
          amount : ingDetail[0],
          has_sugar : true
        }
      }else{
        objIng = {
          name : ingDetail[1],
          amount : ingDetail[0],
          has_sugar : false
        }
      }
      tempIng.push(objIng)
    }
    return tempIng
  }

  static cookieRecommendation(day, cookies) {
    let cookiesRec = []
    for (var i = 0; i < cookies.length; i++) {
      let has_sugar = 0
      for (var j = 0; j < cookies[i].ingredients.length; j++) {
        if(cookies[i].ingredients[j].has_sugar == true){
          has_sugar++
        }
      }
      if(has_sugar == 0){
        cookiesRec.push(cookies[i])
      }
    }
    return cookiesRec
  }
}

const fs = require('fs')
const util = require('util') // menampilkan semua isi object [[object],[object],...]

let options = fs.readFileSync('cookies.txt', 'utf8').split('\n')

let batch_of_cookies = CookieFactory.create(options)
console.log(util.inspect(batch_of_cookies, false, null));
//
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log("sugar free cakes are :");
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}
