//your code here
'use strict'
let fs = require('fs')
let options = fs.readFileSync('cookieswithingerdients.txt','utf-8').trim().split('\n')
let arrOpt = []
for(let i = 0; i < options.length; i ++){
  arrOpt.push(options[i].split(','))
}
//let a = []
// let ing = []
// for(let i = 1; i < arrOpt.length; i++){
//   for(let j = 0; j < arrOpt[i].length; j++){
//     ing.push(arrOpt[i][j].split(':'))
//   }
// }

//console.log(arrOpt[0])
//for(let i = 0; i < ing.length)

//console.log(ing)
// for(let i = 0; i < ing.length;i++){
//   for(let j = 0; j < ing[i].length; j++){
//
//   }
// }
class Ingerdients {
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

class Cookie {
  constructor(){
    this.status = 'mentah'
    this.ingerdients = []
  }
  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name,ingerdients){
    super()
    this.name = name
    this.peanut_count = 100
    this.ingerdients=ingerdients
  }
}

class OtherCookies extends Cookie {
  constructor(name){
    super()
    this.name = name
    this.other_count = 150
  }
}

class ChocholateChip extends Cookie {
  constructor(name){
    super()
    this.name = name
    this.choc_chip_count = 200

  }
}

class CookieFactory {
  static create(options){
    let batch = []
    // let obj ={}
    // for(let i = 0; i < ing.length;i++){
    //   obj[ing[i][1]]=ing[i][0]
    // }

    for(let i = 0; i < options.length; i++){
      let obj = {}
      let ing = []
      for(let j = 0; j < options.length; j++){
        let a =options[i][j].split(':')
        obj['name']=a[1]
        obj['amount']=a[0]
      //ing.push(obj)
      //console.log(obj)

      //console.log(new Ingerdients(obj))
        if(options[i][0] == 'peanut butter '){
          batch.push(new PeanutButter(options[i][0]))
        }
        if(options[i][0] == 'chocolate chip '){
          batch.push(new ChocholateChip(options[i][0]))
        } else if(options[i][0]!='peanut butter ' && options[i][0]!='chocolate chip '){
          batch.push(new OtherCookies(options[i][0]))
        }
      }
      return batch
    }
  }
}





 let batch_of_cookies = CookieFactory.create(arrOpt)
 console.log(batch_of_cookies)
 //let sugarFreeFoods = CookieFactory.cookieRecomendation('teusday', batch_of_cookies)
// console.log('sugar free cakes are :')
// for(let i = 0; i < sugarFreeFoods.length; i++){
//   console.log(sugarFreeFoods[i].name)
// }
