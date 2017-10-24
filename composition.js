"use strict"
const fs = require('fs')
class Cookie {
  constructor(nama) {
    this.name = nama
    this.status = 'mentah';
    this.ingridients= []
  }
  bake() {
    this.status = 'selesai dimasak'
  }
}
class PeanutButter extends Cookie {
  constructor(nama) {
    super(nama)
    this.peanut_count=100
  }
}
class ChocolateChip extends Cookie {
  constructor(nama) {
    super(nama)
    this.choc_chip_count=200
  }

}
class OtherCookie extends Cookie {
  constructor(nama){
    super(nama)
    this.other_count=150
  }
}

class CookieFactory {

  static create(options){
    
    let result=[]

    //split isi data sesuai banyak properti
    for(let i=0;i<options.length-1;i++){
      if(options[i]=='peanut butter'){
        result.push(new PeanutButter(options[i]))
      }
      else if(options[i]=='chocolate chip'){
        result.push(new ChocolateChip(options[i]))
      }
      else{
        result.push(new OtherCookie(options[i]))
      }

    }
    return result
  }

}


let options = fs.readFileSync('./cookies.txt','UTF-8').split('\n');
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
