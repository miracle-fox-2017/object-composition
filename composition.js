const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8')

class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = ingredients;
    this.sugar = this.cekSugar();
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  cekSugar() {
    for (let value in this.ingredients) {
      if (this.ingredients[value].name === 'sugar') 
      return true;
    }
    return false;
  }
}

class Ingredient {
  constructor(options) {
    this.name = options['name'];
    this.amount = options['amount'];
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.peanut_count = 100;
  }  
  
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    let splittedCookie = options.split('\n');
    let setArrCookie = [];
    
    for (let i = 0; i < splittedCookie.length; i++) {
      let arrBahan = [];
      let name = splittedCookie[i].split(' = ')[0];
      let ingredient = splittedCookie[i].split(' = ')[1].split(', ');
      let objBahan = {};

      for (let j = 0; j < ingredient.length; j++) {
        objBahan['name'] = ingredient[j].split(' : ')[1];
        objBahan['amount'] = ingredient[j].split(' : ')[0];
        arrBahan.push(new Ingredient(objBahan));
      }
      
      if (name === 'peanut butter') {
        setArrCookie.push(new PeanutButter(name, arrBahan));
      } else if (name === 'chocolate chip') {
        setArrCookie.push(new ChocolateChip(name, arrBahan));
      } else {
        setArrCookie.push(new OtherCookie(name, arrBahan));
      }
    }

    return setArrCookie;
  }

  static cookieRecommendation(day, cookies) {
    let hasil = [];
    for (let i = 0; i < cookies.length; i++) {
      console.log(cookies[i]);
      if (cookies[i].sugar === false) 
      hasil.push(cookies[i]);
    }

    return hasil;
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarResult = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies);
console.log('sugar free cakes are :');
for (let i = 0; i < sugarResult.length; i++) {
  console.log(sugarResult[i].name);
}