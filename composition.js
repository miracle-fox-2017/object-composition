"use strict"
const fs = require('fs');
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
  constructor(name) {
    super()
    this.name = name
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.choc_chip_count = 200
  }
}

  class OtherCookie extends Cookie {
    constructor(name) {
      super()
      this.name = name
      this.other_count = 150
    }
  }

class CookieFactory {
  static create(options){
    let result = []
    let parsing = fs.readFileSync(options).toString().split('\n');
    parsing.forEach(dataCookie => {
      if(dataCookie === 'peanut butter'){
        result.push(new PeanutButter(dataCookie))
      } else if(dataCookie === 'chocolate chip'){
        result.push(new ChocolateChip(dataCookie))
      } else {
        result.push(new OtherCookie(dataCookie))
      }
    })
    return result
  }
}

let bath_of_cookies = CookieFactory.create('cookies0.txt')
console.log(bath_of_cookies);
