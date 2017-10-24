//your code here\

var fs = require('fs')
var options = fs.readFileSync('./cookies.txt', 'utf8').split('\n')
const util = require('util')


class Inggredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']

  }
}

class Cookie {
  constructor (name, bahan){
    this.name = name
    this.status = 'mentah'
    this.ingredients = bahan
    this.has_sugar = this.hasSugar()//panggil method yang ngecek ada gula ngga di ingredients
  }

  hasSugar(){

    let bahan = this.ingredients
    let flag = false

    bahan.forEach(dataBahan=>{
      // console.log(dataBahan.hasOwnProperty('name'));
      if(dataBahan.hasOwnProperty('name') && dataBahan.name === 'sugar'){
        flag = true
      }
    })
    return flag

  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, bahan) {
    super(name, bahan)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, bahan) {
    super(name, bahan)
  this.choc_chip_count = 200
  }
}
class OtherCookie extends Cookie {
  constructor(name, bahan) {
    super(name, bahan)
  this.choc_cheese_count = 150
  }
}


class CookieFactory {

  static create (options) {
    let arrDaftarCookie = []
    for(let i =0; i < options.length-1;i++){

      let indeks = options[i].split('=')
      if (indeks[0] ==  'peanut butter '){
      arrDaftarCookie.push(new PeanutButter(indeks[0], this.bahan(indeks[1])))
      }
      else if(indeks[0] ==  'chocolate chip '){
        arrDaftarCookie.push(new ChocolateChip(indeks[0], this.bahan(indeks[1])))
      }
    else{
        arrDaftarCookie.push(new OtherCookie(indeks[0], this.bahan(indeks[1])))
      }

    }

    return arrDaftarCookie
  }

  static bahan (params){


    let foo = params.split(',')
    let arrBahan = []

    for(let i =0; i < foo.length; i++){
    let pisah = foo[i].split(':')
    let flag = false

      if(pisah[1] === 'sugar'){flag = true}

      let obj = {
        name : pisah[1],
        amount : pisah[0],
        has_sugar : flag
      }

      let bahanKue =  new Inggredient(obj)
      arrBahan.push(bahanKue)
    }

    return arrBahan
  }

  static cookieRecomendation(hari, listKue){
    let arr = []

    batch_of_cookies.forEach(item => {
      if(item.has_sugar == false){
        arr.push(item.name)
      }
    })
    return `sugar free cakes are: ${arr}`
  }



}


let batch_of_cookies = CookieFactory.create(options)

//console.log(batch_of_cookies)
console.log(util.inspect(batch_of_cookies, false, null))
console.log('--------------------------------------')
console.log('--------------------------------------')
console.log('--------------------------------------')
console.log('--------------------------------------')
console.log('--------------------------------------')
console.log(CookieFactory.cookieRecomendation('tuesday', batch_of_cookies));








// alternative shortcut
