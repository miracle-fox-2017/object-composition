//your code here
const fs = require('fs');
class ingredients {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    // this.has_sugar = options['has_sugar']
  }


}

class Cookie {
  constructor(name,options) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = options
    this.has_sugar = this.checksugar()
  }
  bake(){
    this.status = 'selesai dimasak'
  }
  checksugar(){
    let isSugar = false
    for (let i = 0;i<this.ingredients.length;i++){
        if (this.ingredients[i].name === 'sugar'){
          isSugar = true

        }
    }
      return isSugar
  }

}

class PeanutButter extends Cookie {
  constructor(name,ingredients) {
    super (name,ingredients)
    this.peanut_count = 100
    // this.ingredients = ingredients
  }

}

class ChocholateChip extends Cookie{
  constructor(name,ingredients) {
    super(name,ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name,ingredients) {
    super(name,ingredients)
    // this.name = name
    this.other_count = 150
  }

}


class CookieFactory {
  static create(options) {
    let arr = []
    let arrIngrediens = []
    for (let i =0;i<options.length-1;i++){
        let temp = options[i].split(' = ')
        arrIngrediens.push(temp)
        if (arrIngrediens[i][0] == 'peanut butter' ){

            let peanutbutter = new PeanutButter(arrIngrediens[i][0], this.pecahIngredients(arrIngrediens[i][1] = arrIngrediens[i][1].split(',')))
            console.log(peanutbutter);
            arr.push(peanutbutter)
        }
        else if (arrIngrediens[i][0] === 'chocolate chip') {

            let chocho = new ChocholateChip(arrIngrediens[i][0],this.pecahIngredients(arrIngrediens[i][1] = arrIngrediens[i][1].split(',')))
            arr.push(chocho)
        }
        else {

          let other = new OtherCookie(arrIngrediens[i][0],this.pecahIngredients(arrIngrediens[i][1] = arrIngrediens[i][1].split(',')))
          arr.push(other)
        }
    }

    // console.log(arr);
    return arr
  }

  static pecahIngredients(ingredients) {

    let arr = []
    for (let i= 0; i<ingredients.length;i++){
      let obj = {}
      let tempPecahArr = ingredients[i].split(' : ')
      obj.name = tempPecahArr[1]
      obj.amount = tempPecahArr[0]
      arr.push(obj)
      debugger
      // let amount = ingredients[i][0]
      // console.log(obj);

    }
    return arr
    // console.log(arr);
  }

  //
  static cookieRecommendation(day,option){
    // console.log(option);
    let arrNonSugar = []
      if (day == "tuesday"){

        for(let i=0;i<option.length;i++){
          if (option[i].has_sugar === false){
            arrNonSugar.push(option[i])
          }
        }
        return arrNonSugar
      }
      else {
        return option
      }

}

}


    //accept an list of cookie
    // creates those cookies by sending an array of ingredients to cook ie.new

  //define other methods as need


// class ingredients {
//   constructor(options) {
//     this.name = options['name']
//     this.amount = options['amount']
//     this.has_sugar = options['has_sugar']
//   }
//
//
// }
//
// class Cookie {
//   constructor(ingredients) {
//     this.ingredients = ingredients
//   }
//
//
//
// }
// function CookieFactory(){
//   function create(cookies){
//     //accept an list of cookie
//     // creates those cookies by sending an array of ingredients to cook ie.new
//   }
//   //define other methods as need
// }

let options = fs.readFileSync('cookies.txt','utf-8').split('\n')
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)
console.log('Sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}
