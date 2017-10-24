'use strict'
let fs = require('fs');
let options = fs.readFileSync('cookies.txt').toString().split('\n');

class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = ingredients;
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingred) {
    super(name, ingred);
    this.name = name;
    this.peanut_count = 100;
    this.ingredients = ingred;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingred) {
    super(name, ingred);
    this.name = name;
    this.choc_chip_count = 200;
    this.ingredients = ingred;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingred) {
    super(name, ingred);
    this.name = name;
    this.other_count = 150;
    this.ingredients = ingred;
  }
}

class CookieFactory {
  static create(options) {
    let arr = [];
    let splitted;
    // console.log(options);
    for (let i = 0; i < options.length - 1; i++) {
      // console.log(i);
      splitted = options[i].split('=');
      // console.log(options[i]);
      // console.log(splitted[0]);
      if (splitted[0] == 'peanut butter ') {
        let peanutButter = new PeanutButter(splitted[0], this.ingredients(splitted[1]));
        peanutButter.bake();
        arr.push(peanutButter);
      } else if (splitted[0] == 'chocolate chip ') {
        let chocolateChip = new ChocolateChip(splitted[0], this.ingredients(splitted[1]));
        chocolateChip.bake();
        arr.push(chocolateChip);
      } else {
        let otherCookies = new OtherCookie(splitted[0], this.ingredients(splitted[1]));
        otherCookies.bake();
        arr.push(otherCookies);
      }
    }

    return arr;

  }

  static ingredients(params) {
    let ingredientCookies = params.split(',');
    // console.log(ingredientCookies);
    let nameIng = [];
    for (let x = 0; x < ingredientCookies.length; x++) {
      let ammount = ingredientCookies[x].split(' : ');
      // console.log(ammount[1]);
      if (ammount[1] == 'sugar') {
        let obj = {
          name : ammount[1],
          ammount : ammount[0],
          has_sugar : true
        };
        nameIng.push(obj);
      } else {
        let obj = {
          name : ammount[1],
          ammount : ammount[0],
          has_sugar : false
        };
        nameIng.push(obj);
      }
    }

    return nameIng;
  }

  static cookieRecommendation(day, data) {
    let answer = [];
    let check;
    for (let x = 0; x < data.length; x++) {
      let tempIng = data[x].ingredients;
      let tempName = data[x].name;
      for (let y = 0; y < tempIng.length; y++) {
        check = tempIng[y].has_sugar;
        if (check) {
          break;
        }
      }

      if (!check) {
        answer.push(data[x]);
      }
    }

    return answer;
  }
}

class Ingredient {
  constructor(ingredient_name, ammount, has_sugar) {
    this.name = ingredient_name;
    this.amount = ammount;
    this.has_sugar = has_sugar;

  }
}

let batch_of_cookies = CookieFactory.create(options);
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
// console.log(batch_of_cookies);
console.log('sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
// console.log(sugarFreeFoods);
