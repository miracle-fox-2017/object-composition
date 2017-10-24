const fs = require('fs')

class Ingredients {
  constructor(options){
    this.name = options[1]
    this.amount = options[0]
  }


}

class Cookie {
  constructor(nama, komposisi) {
    this.name = nama;
    this.status = "mentah"
    this.ingredients = this.ObjIngridients(komposisi);
    this.has_sugar = this.has_sugar();
  }
  bake() {
    this.status = "selesai dimasak"
  }
  ObjIngridients (komposisi){
    let result = [];
    for(let i = 1; i < komposisi.length; i++){
      // data.push(file[i].split(',')) //data sudah ditampung di dalam array
      let temp = komposisi[i].split(' : ');
      result.push(new Ingredients(temp))
    }
    return result
  }
  has_sugar(){
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].name == "sugar"){return true}
      else{return false}
    }
  }

}

class PeanutButter extends Cookie{
  constructor(nama,komposisi) {
    super(nama,komposisi)
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(nama,komposisi) {
    super(nama,komposisi)
    this.chocolate_chip = 200
  }
}

class OtherCookie extends Cookie{
  constructor(nama,komposisi){
    super(nama,komposisi)
    this.chocolate_butter = 150
  }
}

class CookieFactory {
  static create(options){
    let Obj = [];
    options = options.split('\n')
    let tampung = []
    // options = options.replace(/=/g, '').split('\n');
    // console.log(options);
    // console.log(options);
    // for(let i = 0; i < options.length; i++){
    //   let temp = options[i].split(' =')
    //   Obj.push(temp[1])
    //           // Obj.push(new Ingredients(temp))
    // }
    // for(let j = 0; j < Obj.length-1; j++){
    //   tampung.push(Obj[j].split(','));
    // }
    // return tampung
    // console.log(new PeanutButter());
    // let a = Obj
    // console.log(a);
    // console.log(options);
    let arr = [];
    for(let i = 0; i < options.length-1; i++){
      let ab = options[i].split(' =')
      // console.log(ab[1].split(','));
      if(ab[0] == 'peanut butter'){

        arr.push(new PeanutButter(ab[0], ab[1].split(',')))
      }
      else if(ab[0] == 'chocolate chip'){
        arr.push(new ChocolateChip(ab[0], ab[1].split(',')))
      }
      else{
        arr.push(new OtherCookie(ab[0], ab[1].split(',')))
      }
    }
    return arr
    // let obj
  }
}

let options = fs.readFileSync('cookies.txt', 'utf-8');
// let batch_of_cookies = CookieFactory.create(options)
let pabrik = CookieFactory.create(options);
let komposisi = new Ingredients(options)
console.log(pabrik);
// let peanutbutter = new PeanutButter('peanut butter');
// let coklatchip = new ChocolateChip('chocolate chip')
// let othercookie = new OtherCookie('chocolate cheese')
// let cookie = new Cookie();
// console.log(othercookie);








//
