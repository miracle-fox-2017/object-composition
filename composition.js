//your code here
"use strict"
const fs = require('fs');

class Ingredients {
  constructor(options){
    this.name = options['name'];
    this.amount = options['amount'];
    // this.has_sugar = options['has_sugar'];
  }
}

class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = ingredients;
    this.has_sugar = this.checkSugar();
  }
  bake(){
    this.status = "selesai dimasak";
  }
  checkSugar(){
    for(let i = 0; i<this.ingredients.length; i++){
      if(this.ingredients[i].name == 'sugar'){
        return true;
      }      
    }
    return false;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.other_count = 150;
  }
}

class ChocholateChipCrumbled{}

class PeanutButterCrumbled{}

class CookieFactory {
  constructor(options) {
    //accept list of cookie types
    
  }
  
  //define other methods
  static create(options){
    let cookie = options.split('\n');
    let result = [];
    
    for(let i = 0; i<cookie.length; i++){
      let name = cookie[i].split(' = ')[0];
      let ingredients = cookie[i].split(' = ')[1].split(', ');
      
      let objIng = {};
      let ingreObj = [];
      for(let j = 0; j< ingredients.length; j++){
        objIng['name'] = ingredients[j].split(' : ')[1];
        objIng['amount'] = ingredients[j].split(' : ')[0];
        ingreObj.push(new Ingredients(objIng));
      }
      
      if(name == 'peanut butter'){
        result.push(new PeanutButter(name, ingreObj));
      } else if (name == 'chocolate chip'){
        result.push(new ChocholateChip(name, ingreObj));
      } else {
        result.push(new OtherCookie(name, ingreObj));
      }
    }
    
    return result;
  }
  
  static cookieRecommendation(name, cookies){
    let result = [];
    
    //if tuesday sugar free
    if(name == 'tuesday'){
      for(let i = 0; i<cookies.length; i++){
        if(cookies[i].has_sugar == false){
          result.push(cookies[i]);
        }
      }
    }
    
    // console.log(result);
    return result;
    
  }

  static cookieMentah(cookies){
    //return kue yang belum matang
    let result = [];
    for(let i = 0; i<cookies.length; i++){
      if(cookies[i].status == 'mentah'){
        result.push(cookies[i]);
      }
    }
    return result;
  }

  static panggang(cookies){
    let cook = new Cookie(cookies.name, cookies.ingredients)
    cook.bake();
    console.log(cook.name, ' sedang dipanggang');
    // cookies.status = 'matang';
    console.log(cook);
    
  }
}

//option adalah file yang dibuka
let options = fs.readFileSync('cookies.txt').toString();
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('\nsugar free cakes are :');
for(let i = 0; i< sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}

let mentah = CookieFactory.cookieMentah(batch_of_cookies);
console.log('\nyang mentah : ');
for(let i = 0; i< mentah.length; i++){
  console.log(mentah[i].name);
}

// ternyata ini di hari kamis
// console.log('\nsedang dipanggang :');
// CookieFactory.panggang(batch_of_cookies[0])

// console.log(batch_of_cookies[0]);