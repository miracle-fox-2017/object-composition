const fs = require('fs');
const options = fs.readFileSync('cookies.txt', 'utf-8');

class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = ingredients;
    this.sugar = this.checkSugar();
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  checkSugar() {
    for (let value in this.ingredients) {
      if (this.ingredients[value].name === 'sugar') return true;
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
    const arrCookies = options.split('\n');
    const allCookies = [];
    
    for (let i = 0; i < arrCookies.length; i++) {
      const name = arrCookies[i].split(' = ')[0];
      const ingredient = arrCookies[i].split(' = ')[1].split(', ');
      const arrIngredient = [];
      const ingredientObj = {};

      for (let j = 0; j < ingredient.length; j++) {
        ingredientObj['name'] = ingredient[j].split(' : ')[1];
        ingredientObj['amount'] = ingredient[j].split(' : ')[0];
        arrIngredient.push(new Ingredient(ingredientObj));
      }
      
      if (name === 'peanut butter') {
        allCookies.push(new PeanutButter(name, arrIngredient));
      } else if (name === 'chocolate chip') {
        allCookies.push(new ChocolateChip(name, arrIngredient));
      } else {
        allCookies.push(new OtherCookie(name, arrIngredient));
      }
    }

    return allCookies;
  }

  static cookieRecommendation(day, cookies) {
    const result = [];
    for (let i = 0; i < cookies.length; i++) {
      console.log(cookies[i]);
      if (cookies[i].sugar === false) result.push(cookies[i]);
    }

    return result;
  }
}

const batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

const sugarFreeFoods = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies);
console.log('\n', '\n', '\n');
console.log('sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
