"use strict"
const fs = require('fs');

class Cookie {
  constructor(name, ingredients) {
    this.name        = name;
    this.status      = 'mentah';
    this.ingredients = JSON.stringify(ingredients)
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingredients) {
    super(name, ingredients);
    this.choco_chip_count = 200;
  }
}

class OtherCookies extends Cookie {
  constructor(name,ingredients) {
    super(name, ingredients);
    this.other_cookies_count = 150;
  }
}

let options = fs.readFileSync('cookies.txt', 'utf-8').split('\n');

class CookieFactory {
  static create(options) {
    let arr = [];
    for(let i = 0 ; i < options.length -1; i++) {
      let spl = options[i].split(' = ');
      console.log(spl[0]);
      // console.log(this.pecahBahan(spl[1]))
      if(spl[0] === 'peanut butter') {
        let kacangMentega = new PeanutButter(spl[0], this.pecahBahan(spl[1]));
        arr.push(kacangMentega);
      } else if(spl[0] === 'chocolate chip') {
        let coklatchip = new ChocolateChip(spl[0], this.pecahBahan(spl[1]));
        arr.push(coklatchip);
      } else {
        let cookies = new OtherCookies(spl[0], this.pecahBahan(spl[1]));
        arr.push(cookies);
      }
    }
      return arr;
  }

  //bikin method untuk pecah si Ingredient
  //static aja nanti parameternya adalah
  //1 cup : flour, 2 cups (gluten) : sugar, 2 cups : peanut butter , 1 cup : cinnamon, 2 tsp : butter'
  static pecahBahan(rawBahan) {
    let arrBahan = []
      let pisah = rawBahan.split(',');
      for (var i = 0; i < pisah.length; i++) {
        let fixBahan = pisah[i].split(':')
        let options = {}
        options.name = fixBahan[1]
        options.amount = fixBahan[0]
        let objBahan = new Ingredient(options);
        arrBahan.push(objBahan)
      }
      return arrBahan
  }
}

class Ingredient {
  constructor(options) {
    this.name = options.name;
    this.amount = options.amount;
  }
}


// console.log(options);
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
