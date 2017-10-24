"use strict"

//your code here
const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n')
// console.log(options)

class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}

class CookieFactory {
  static create(options) {
    let ingredients = this.ingredientsData(options)
    // console.log(ingredients)
    let arrCookies = []
    for(let i = 0; i < options.length; i++) {
      let arrOptions = options[i].split(' = ')
      if(arrOptions[0] == 'peanut butter') {
        arrCookies.push(new PeanutButter(arrOptions[0], ingredients[i]))
      } else if(options[i] == 'chocolate chip') {
        arrCookies.push(new ChocolateChip(arrOptions[0], ingredients[i]))
      } else {
        arrCookies.push(new OtherCookie(arrOptions[0], ingredients[i]))
      }
      // console.log(this.ingredientsData(arrOptions[1]))
    }
    return arrCookies
  }

  static ingredientsData(options) {
    // split (=)
    let splitSamaDengan = []
    for(let i = 0; i < options.length; i++) {
      let split1 = options[i].split(' = ')
      splitSamaDengan.push(split1[1])
    }

    // split (,)
    let splitKoma = []
    for(let i = 0; i < splitSamaDengan.length; i++) {
      let split2 = splitSamaDengan[i].split(', ')
      splitKoma.push(split2)
    }

    // console.log(splitKoma);

    // split (:)
    let ingredients = []
    let finalSplit = []
    let sugar = true
    for(let i = 0; i < splitKoma.length; i++) {
      let tampung = []
      for(let j = 0; j < splitKoma[i].length; j++) {
        finalSplit = splitKoma[i][j].split(' : ')

        if(finalSplit[1] == 'sugar') {
          sugar = true
        } else {
          sugar = false
        }

        let obj = {
          name: finalSplit[1],
          amount: finalSplit[0],
          has_sugar: sugar
        }
        // console.log(obj);
        let bahan = new Ingredient(obj)
        tampung.push(bahan)
      }
      ingredients.push(tampung)
    }
    return ingredients
  }
}

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

// let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);

// let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
// console.log('sugar free cakes are :')
// for(let i = 0; i < sugarFreeFoods.length; i++) {
//   console.log(sugarFreeFoods[i].name);
// }

console.log(CookieFactory.create(options));
// console.log(CookieFactory.ingredientsData(options))
