"use strict"

const fs = require('fs')

class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
    // this._recipe =
    // this._list = []
  }

  bake() {
    this.status = 'selesai dimasak'
  }

}

class Ingredients {
  constructor(ingredients){

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

class OtherCookie extends Cookie {
  constructor(name, ingredients){
    super(name, ingredients)
    this.other_count = 150
  }
}

class CookieFactory {
  static create(options){
    let ready = []
    let spliter = []
    for(let i = 0; i < options.length - 1; i++){
      spliter.push(options[i].split(' = '))
    }
    for(let j = 0; j < options.length - 1; j++){
      debugger
      // console.log(options[i]);
      if(options[j] == 'peanut butter'){
        ready.push(new PeanutButter(spliter[j]))
      }
      else if(options[j] == 'chocolate chip'){
        ready.push(new ChocholateChip(spliter[j]))
      }
      else {
        ready.push(new OtherCookie(spliter[j]))
      }
    }
    return ready
  }

  static splitIngredients(){
    
  }
}
let options = fs.readFileSync('./cookies.txt','utf-8').split('\n');
console.log(options); // Recipe List Test

// Recipe Test
let selaiKacang = new PeanutButter('peanut butter')
// console.log(selaiKacang);


// CookieFactory
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
