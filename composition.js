const fs = require('fs');


class Cookie {

  constructor(name, ingredients) {

    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients

  }

  bake() {

    this.status = "selesai dimasak"

  }

}

class PeanutButter extends Cookie {

  constructor(nama, ingredients) {

    super(nama, ingredients)

    this.peanut_count = 100

  }

}

class OtherCookie extends Cookie {

  constructor(nama, ingredients) {

    super(nama, ingredients)

    this.other_count = 150

  }

}

class ChocolateChip extends Cookie {

  constructor(nama, ingredients) {

    super(nama, ingredients)

    this.choc_chip_count = 200

  }

}

class CookieFactory {

  static create(options) {

    var arrOptions = []
    var namaCookie = []
    var arrIngredients = []
    var ingredients = []
    var objIngredients = []
    var arrKue = []

    //Jadikan Array dengan pemisah berdasarkan \n
    arrOptions = options.split('\n')
    arrOptions.pop()

    //Pisahkan nama cookie dan ingredients untuk mendapatkan namaCookie
    arrOptions.forEach((element) => {
      namaCookie.push(element.split('=')[0])
      arrIngredients.push(element.split('=')[1])
    })

    arrIngredients.forEach((element) => {
      ingredients.push(element.split(','))
    })

    for(var i = 0; i < ingredients.length; i++) {
      var temp = []
      for(var j = 0; j < ingredients[i].length; j++) {
        var obj = {}
        obj.name = ingredients[i][j].split(':')[1]
        obj.amount = ingredients[i][j].split(':')[0]
        obj.has_sugar = (obj.name == 'sugar')? true: false
        temp.push(new Ingredients(obj))
      }
      objIngredients.push(temp)
    }

    for(var i = 0; i < namaCookie.length; i++) {
      if(namaCookie[i] == 'peanut butter') {
        arrKue.push(new PeanutButter(namaCookie[i], objIngredients[i]))
      }
      else if(namaCookie[i] == 'chocolate chip') {
        arrKue.push(new ChocolateChip(namaCookie[i], objIngredients[i]))
      }
      else {
        arrKue.push(new OtherCookie(namaCookie[i], objIngredients[i]))
      }
    }
    return arrKue
  }

  static cookieRecomendation(day, cookie) {
    var hasil = []
    if(day == 'tuesday') {
      for(var i = 0; i < cookie.length; i++) {
        var sugar = 0
        for(var j = 0; j < cookie[i].ingredients.length; j++) {
          if(cookie[i].ingredients[j].has_sugar) {
            sugar = sugar + 1
          }
        }
        if(sugar == 0) {
          hasil.push(cookie[i])
        }
      }
    }
    return hasil
  }

}

class Ingredients {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}


var rawData = fs.readFileSync('cookies.txt', 'utf8')
var kue = CookieFactory.create(rawData)
var sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', kue)

console.log('sugar free cake are: ');
for(var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
