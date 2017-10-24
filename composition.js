//your code here
"use strict"

let fs = require('fs');

class Cookie {
  constructor(name) {
    this.status = "mentah";
    this.name = name;
    this.ingridients = [];
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name) {
    super(name)

    this.other_count = 150;
  }
}

class Ingridients {
  constructor() {

  }
}

class CookieFactory {
  static create(options){
    let peanutButter = new PeanutButter;
    let chocholateChip = new ChocholateChip;
    let otherCookie = new OtherCookie;

    let newArr = []

    let i = 0
    while( i < options.length-1 ) {
      let cookie = '';

      switch (options[i]) {
        case 'peanut butter':
          cookie = new PeanutButter(options[i]);
          break;
        case 'chocolate chip':
          cookie = new ChocholateChip(options[i]);
          break;
        default:
          cookie = new OtherCookie(options[i]);
      }

      newArr.push(cookie);
      i++
    }
    // console.log(newArr);

    return newArr;
  }

  // cookiesObj(){
  //   let data =
  // }

}
let options = fs.readFileSync('cookies.txt').toString().split('\n')


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
