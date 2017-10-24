"use strict"

class Cookie {
    constructor(name,ingredients){
        this.name = name;
        this.status = "mentah";
        this.ingredients = this.setIngredients(ingredients);
        this.has_sugar = this.setSugar();
    }

    bake(){
        this.status = "selesai dimasak";
    }

    setIngredients(data) {
        let arrBaru = [];
        // console.log(data);
        for (let i = 1; i < data.length; i++) {
            let getData = data[i].split(' : ');
            // console.log(getData[0]);
            arrBaru.push(new Ingredients(getData));
        }
        // console.log(arrBaru);
        return arrBaru;
    }

    setSugar(){
        for (let i = 0; i < this.ingredients.length;i++){
            if (this.ingredients[i].name === 'sugar'){
                return true;
            }
        }
        return false;
    }

}

class PeanutButter extends Cookie {
    constructor(name, ingredients){
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

class Ingredients{
    constructor(option){
        this.name = option[1];
        this.amount = option[0];
       // this.has_sugar = options['has_sugar'];
    }

}

class CookieFactory {
    static create(option){
        let getPush = [];
        let getArr = [];
       
        for (let i = 0; i < option.length;i++){

            getArr.push(options[i].split(' ='));

            if (getArr[i][0] === 'peanut butter'){
                let peanut = new PeanutButter(getArr[i][0], getArr[i][1].split(','));
                getPush.push(peanut);
            } else if (getArr[i][0] === 'chocolate chip'){
                let chocholate = new ChocholateChip(getArr[i][0], getArr[i][1].split(','));
                getPush.push(chocholate);
            }else{
                let other = new OtherCookie(getArr[i][0], getArr[i][1].split(','));
                getPush.push(other);
            }
        }
        
        return getPush;
             
    }

    static cookieRecommendation(hari,option){
    let simpanSugar = []
    if (hari === 'Selasa'){
        for (let i = 0; i < option.length;i++){
            if(option[i].has_sugar===false){
                simpanSugar.push(option[i]);
            } 
        }
    }else{
        for (let i = 0; i < option.length; i++) {
            // if (option[i].has_sugar === true) {
                simpanSugar.push(option[i]);
            // }
        }
    }
        return simpanSugar;
    }

}

const fs = require('fs');
let options = fs.readFileSync('./bahan.txt', 'utf8').split('\n');

let batch = CookieFactory.create(options);

console.log("sugar free cakes are :");

let sugarFreefoods = CookieFactory.cookieRecommendation("Selasa",batch);

// console.log(sugarFreefoods.length);

for (let i = 0; i < sugarFreefoods.length; i++){
    console.log(sugarFreefoods[i].name);
}