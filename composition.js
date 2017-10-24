//your code here
"use strict"
const fs        = require(`fs`)
let options     = fs.readFileSync('./cookies.txt', 'utf-8').split('\r\n')

class Cookie {
    constructor(name){
        this.name = name
        this.status = 'mentah'
        this.ingredients = []
    }

    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name){
        super(name)
        
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name){
        super(name)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name){
        super(name)
        this.other_count = 150
    }
}

class CookieFactory {
    constructor(){

    }
    static create(options){
        let products = []
        console.log(options)
        let pB = new PeanutButter(options[0]); console.log(pB)
        let chocoChip = new ChocolateChip(options[1]);
        let chocoCheese = new OtherCookie(options[2]);
        let chocoButter = new OtherCookie(options[3]);
        products.push(pB);
        products.push(chocoChip);
        products.push(chocoCheese);
        products.push(chocoButter);
        
        return products
    }
}


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);