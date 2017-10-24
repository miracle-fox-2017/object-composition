'use strict'
const fs = require('fs')

class Ingredient{
  constructor(options){
    this.name      = options.name
    this.amount    = options.amount
    this.has_sugar = options.has_sugar
  }
}

class Cookie{
  constructor(name,composition){
    this.name        = name
    this.status      = 'mentah'
    this.ingredients = composition
  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name,composition){
    super(name,composition)
    this.ingredients  = composition
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name,composition){
    super(name,composition)
    this.ingredients     = composition
    this.choc_chip_count = 200
  }
}

class ChocolateCheese extends Cookie {
  constructor(name,composition){
    super(name,composition)
    this.ingredients     = composition
    this.cheese_count = 800
  }
}

class ChocolateButter extends Cookie {
  constructor(name,composition){
    super(name,composition)
    this.ingredients     = composition
    this.choc_chip_count = 200
  }
}


class CookieFactory{
  static create(options){
    // accepts a list of cookie types and return those cookies
    // *import file.txt
    let getData = fs.readFileSync(options, 'utf8').split('\n')

    //* parsing data name + ingredients
    let dataContainer = []
    for(let i=0; i<getData.length; i++){
      dataContainer.push(getData[i].split('='))
    }

    let result = [] // container cookies object

    for(let l=0; l<dataContainer.length-1; l++){
      // ** start peanut butter
      if(dataContainer[l][0].trim() == 'peanut butter'){
        // get ingredient peanut butter
        let ingredientContainer = []
        let peanut_butter_ingredients = dataContainer[l][1].split(',')
        for(let i=0; i<peanut_butter_ingredients.length; i++){
          ingredientContainer.push(peanut_butter_ingredients[i].trim().split(':'))
        }

        // cek status sugar peanut butter
        let status_sugar = true
        if(ingredientContainer[1][1].trim() == 'sugar'){
          status_sugar = true
        }else{
          status_sugar = false
        }

        // import composition ingredients peanut butter class
        let composition = []
        for(let j=0; j<ingredientContainer.length; j++){
          composition.push(new Ingredient({
            name      : ingredientContainer[j][1],
            amount    : ingredientContainer[j][0],
            has_sugar : status_sugar,
          }))
        }

        result.push(new PeanutButter(dataContainer[l][0],composition))

      // ** start chocolate chip
      }else if(dataContainer[l][0].trim() == 'chocolate chip'){
        // get ingredient chocolate chip
        let ingredientContainer = []
        let chocolate_chip_ingredients = dataContainer[l][1].split(',')
        for(let i=0; i<chocolate_chip_ingredients.length; i++){
          ingredientContainer.push(chocolate_chip_ingredients[i].trim().split(':'))
        }

        // cek status sugar chocolate chip
        let status_sugar = true
        if(ingredientContainer[1][1].trim() == 'sugar'){
          status_sugar = true
        }else{
          status_sugar = false
        }

        // import composition ingredients chocolate chip class
        let composition = []
        for(let j=0; j<ingredientContainer.length; j++){
          composition.push(new Ingredient({
            name      : ingredientContainer[j][1],
            amount    : ingredientContainer[j][0],
            has_sugar : status_sugar,
          }))
        }

        result.push(new ChocolateChip(dataContainer[l][0],composition))

      // ** start chocolate cheese
      }else if(dataContainer[l][0].trim() == 'chocolate cheese'){
        // get ingredient chocolate cheese
        let ingredientContainer = []
        let chocolate_chip_ingredients = dataContainer[l][1].split(',')
        for(let i=0; i<chocolate_chip_ingredients.length; i++){
          ingredientContainer.push(chocolate_chip_ingredients[i].trim().split(':'))
        }

        // cek status sugar chocolate cheese
        let status_sugar = true
        if(ingredientContainer[1][1].trim() == 'sugar'){
          status_sugar = true
        }else{
          status_sugar = false
        }

        // import composition ingredients chocolate cheese class
        let composition = []
        for(let j=0; j<ingredientContainer.length; j++){
          composition.push(new Ingredient({
            name      : ingredientContainer[j][1],
            amount    : ingredientContainer[j][0],
            has_sugar : status_sugar,
          }))
        }

        result.push(new ChocolateCheese(dataContainer[l][0],composition))

      // ** start chocolate butter
      }else if(dataContainer[l][0].trim() == 'chocolate butter'){
        // get ingredient chocolate cheese
        let ingredientContainer = []
        let chocolate_chip_ingredients = dataContainer[l][1].split(',')
        for(let i=0; i<chocolate_chip_ingredients.length; i++){
          ingredientContainer.push(chocolate_chip_ingredients[i].trim().split(':'))
        }

        // cek status sugar chocolate cheese
        let status_sugar = true
        if(ingredientContainer[1][1].trim() == 'sugar'){
          status_sugar = true
        }else{
          status_sugar = false
        }

        // import composition ingredients chocolate cheese class
        let composition = []
        for(let j=0; j<ingredientContainer.length; j++){
          composition.push(new Ingredient({
            name      : ingredientContainer[j][1],
            amount    : ingredientContainer[j][0],
            has_sugar : status_sugar,
          }))
        }

        result.push(new ChocolateButter(dataContainer[l][0],composition))
      }
    }

    return result

  }
  // define other methods as needed

  static cookieRecomendation(days, object){
    let recomendation = []

    if(days === 'tuesday'){
      for(let i=0; i<object.length; i++){
        if(object[i].ingredients[0].has_sugar === false){
          recomendation.push(object[i])
        }
      }
    }
    return recomendation
  }

}


let batch_of_cookies = CookieFactory.create('cookies.txt')
let sugarFreeFoods   = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
console.log(batch_of_cookies);
console.log(`\nSugar free cakes are : `)
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(`>>>${sugarFreeFoods[i].name}<<<\n`)
}
