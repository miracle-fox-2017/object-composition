'use strict'


class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = JSON.stringify(ingredients)
  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookies extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}

class CookieFactory {
  static create(options){
    let prepareCookie = []
    for(let i = 0; i < options.length-1; i++){
      let splParam = options[i].split(' = ');
      if(splParam[0] === 'peanut butter'){
        prepareCookie.push(new PeanutButter(splParam[0], this.pecahIngredients(splParam[1])))
      }
      else if(options[i] === 'chocolate chip'){
        prepareCookie.push(new ChocholateChip(splParam[0], this.pecahIngredients(splParam[1])))
      }
      else {
        prepareCookie.push(new OtherCookies(splParam[0], this.pecahIngredients(splParam[1])))
      }
    }
    return prepareCookie
  }

  //method static untuk pecah ingredients
static pecahIngredients(rawBahan){
  let arrBahan = []
  let pecahBahan = rawBahan.split(',');
  for (var i = 0; i < pecahBahan.length; i++) {
    let fixBahan = pecahBahan[i].split(';')
    let options = {}
    options.name = fixBahan[1]
    options.amount = fixBahan[0]
    let objBahan = new ingredients(options)
    arrBahan.push(objBahan)
  }
  return arrBahan
}
}

class ingredients{
  constructor(options){
    this.name = options.name;
    this.amount = options.amount
  }
}
const fs = require('fs')
let options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n');

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies)
