const fs = require('fs')

class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
        this.has_sugar = options['has_sugar']
    }
}
class Cookie {
    constructor(ingredients) {
        this.name = null
        this.status = 'mentah'
        this.ingredients = ingredients

    }
    bake() {
        this.status = "selesai dimasak"
    }
    // getDataIngredient(ingredients) {
    //     let ingredientsSplit = ingredients.split(",")
    //     let arrKomposisi = []
    //     let sugar;
    //     for (let i = 0; i < ingredientsSplit.length; i++) {
    //         let obj = {}
    //         let ingredientsKomposisi = ingredientsSplit[i].split(" : ")
    //         if (ingredientsKomposisi[1] == 'sugar') {
    //             sugar = true
    //         } else {
    //             sugar = false;
    //         }
    //         obj = {
    //             name: ingredientsKomposisi[1],
    //             amount: ingredientsKomposisi[0],
    //             has_sugar: sugar
    //         }
    //         arrKomposisi.push(new Ingredient(obj))

    //     }

    //     return arrKomposisi

    // }

}


class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(ingredients)
        this.name = name
        this.peanut_count = 100
    }
}

class ChocholateChip extends Cookie {
    constructor(name, ingredients) {
        super(ingredients)
        this.name = name
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(ingredients)
        this.name = name
        this.other_count = 150
    }
}

class CookieFactory {
    static create(options) {
        let arr = []
        let optionsSplit
        for (let i = 0; i < options.length; i++) {
            optionsSplit = options[i].split("=")
            let ingredientsSplit = optionsSplit[1].split(",")
            let arrKomposisi = []
            let sugar;
            for (let i = 0; i < ingredientsSplit.length; i++) {
                let obj = {}
                let ingredientsKomposisi = ingredientsSplit[i].split(" : ")
                if (ingredientsKomposisi[1] == 'sugar') {
                    sugar = true
                } else {
                    sugar = false;
                }
                obj = {
                    name: ingredientsKomposisi[1],
                    amount: ingredientsKomposisi[0],
                    has_sugar: sugar
                }
                arrKomposisi.push(new Ingredient(obj))

            }

            if (optionsSplit[0] === 'peanut butter ') {
                arr.push(new PeanutButter(optionsSplit[0], arrKomposisi))
            } else if (optionsSplit[0] === 'chocolate chip ') {
                arr.push(new ChocholateChip(optionsSplit[0], arrKomposisi))
            } else {
                arr.push(new OtherCookie(optionsSplit[0], arrKomposisi))
            }
        }
        return arr;
    }
    static cookieRecommendation(hari, menuCookies) {
        let cek;
        let arr = []
        for (let i = 0; i < menuCookies.length; i++) {
            for (let j = 0; j < menuCookies[i].ingredients.length; j++) {
                cek = menuCookies[i].ingredients[j].has_sugar
                if (cek) {
                    break
                }
            }
            if (!cek) {
                arr.push(menuCookies[i])
            }
        }
        return arr;
    }
}

let options = fs.readFileSync('cookies.txt').toString().split("\n")
let batch_of_cookies = CookieFactory.create(options)
//console.log(batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :")
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)
}