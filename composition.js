"use strict"
const fs = require('fs')
let options = fs.readFileSync('cookies.txt','utf-8').split('\n')
 // console.log();
class Ingredient {
  constructor(options) {
    this.name      = options[1]
    this.amount    = options[0]
  }

}


class Cookie {
  constructor(nama,ingredient) {
    this.name = nama
    this.ingeredient = this.dataBahan(ingredient)
    this.status = 'mentah'
    this.has_sugar = this.cekSugar()
  }
  bake(){
    this.status = 'selesai di masak'
  }

  dataBahan(set){
    let array = []
    for (let i = 0; i < set.length; i++) {
      let sem = set[i].split(' : ');
      let baru = new Ingredient(sem)
      array.push(baru)
    }
    return array
  }
  cekSugar(){
    for (let i = 0; i < this.ingeredient.length; i++) {
      if (this.ingeredient[i].name === 'sugar') {
        return true
      }
    }
    return false
  }

}


class PeanutButter extends Cookie{
  constructor(name,ingeredient) {
    super(name,ingeredient)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie{
  constructor(name,ingeredient) {
    super(name,ingeredient)
    this.choc_chip_count = 200
  }
}

  class OtherCookie extends Cookie {
    constructor(name,ingeredient) {
      super(name,ingeredient)
      this.Other_count = 150
    }
  }

class CookieFactory {

    static create(options){
    let arr =[]
      for (let i = 0; i < options.length-1; i++) {
          let split = options[i].split('=')
        if (split[0]=='peanut butter') {
            let kacang = new PeanutButter(split[0],split[1].split(','))
            arr.push(kacang)
            // console.log(arr);
        }
        else if (split[0] == 'chocolate chip') {
          let chok = new ChocholateChip (split[0],split[1].split(','))
          arr.push(chok)
          // console.log(arr);
        }
        else {
          let lain = new OtherCookie(split[0],split[1].split(','))
          arr.push(lain)
          // console.log(arr);
        }
      }


        return arr
    }

}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
