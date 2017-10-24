"use strict"
const fs = require('fs')

class Cookie {
  constructor(nama,bahan) {
    this.name = nama
    this.status = this.bake();
    this.ingridients= this.objBahan(bahan)
    this._hasSugar=this.Sugar();
  }
  bake() {
    return 'selesai dimasak'
  }
  objBahan(bahan){
    let arrBaru = [];
    // console.log(bahan);
    for (let i = 1; i < bahan.length; i++) {
        let getBahan= bahan[i].split(' : ');
        // console.log(getData[0]);
        arrBaru.push(new Ingredients(getBahan));
    }
    // console.log(arrBaru);
    return arrBaru;
      console.log(arrBaru);
      // debugger
    }
    Sugar(){
       for (let i = 0; i < this.ingridients.length;i++){
        //  console.log('ini this ingri'+this.ingridients[i]);
           if (this.ingridients[i].nama === 'sugar'){
               return true;
           }
       }
       return false;
   }
}

class PeanutButter extends Cookie {
  constructor(nama,bahan) {
    super(nama,bahan)
    this.peanut_count=100
  }
}
class ChocolateChip extends Cookie {
  constructor(nama,bahan) {
    super(nama,bahan)
    this.choc_chip_count=200
  }

}
class OtherCookie extends Cookie {
  constructor(nama,bahan){
    super(nama,bahan)
    this.other_count=150
  }
}

class Ingredients {
  constructor(options){

    this.nama=options[1];
    this.amount=options[0];
  }

}




class CookieFactory {

  static create(options){
    let bahan =[]

   //  console.log(bahan);
    for(let i=0;i<options.length-1;i++){
      bahan.push(options[i].split(' ='))

    }
    // console.log(bahan);
    let result=[]
    // console.log(options[0]);
    //split isi data sesuai banyak properti
    for(let i=0;i<options.length-1;i++){
      // console.log(options[i]);
      if(bahan[i][0]=='peanut butter'){
        result.push(new PeanutButter(bahan[i][0],bahan [i][1].split(',')))
      }
      else if(bahan[i][0]=='chocolate chip'){
        result.push(new ChocolateChip(bahan[i][0],bahan [i][1].split(',')))
      }
      else{
        result.push(new OtherCookie(bahan[i][0],bahan [i][1].split(',')))
      }

    }
    return result
  }
  static Recommendation(hari,options){
   let simpan = []

   if (hari === 'Jumat'){
       for (let i = 0; i < options.length;i++){
           if(options[i]._hasSugar==false){
               simpan.push(options[i]);
           }
       }
     }
  //  }else{
  //      for (let i = 0; i < options.length; i++) {
   //
  //              simpan.push(options[i]);
  //      }
  //  }
       return simpan;
   }

}



let options = fs.readFileSync('./cookies.txt','UTF-8').split('\n');
// console.log(`options adalah ${options}`);

// let ingridients = new Ingredients()
// ingridients.createIngridients(options)
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
console.log('------------------------------------------');
console.log('------------------------------------------');

console.log("sugar free cakes are :");

let sugarFree = CookieFactory.Recommendation("Jumat",batch_of_cookies);

console.log(sugarFree);

// for (let i = 0; i < sugarFree.length; i++){
//     console.log(sugarFree[i].nama);
// }
