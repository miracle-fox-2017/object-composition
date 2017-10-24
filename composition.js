//your code here
"use strict"
const fs        = require(`fs`)
let options     = fs.readFileSync('./cookies.txt', 'utf-8').split('\r\n')

class Cookie {
    constructor(name, ingredients, has_sugar){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
        this.has_sugar = has_sugar
        // console.log(has_sugar)
    }

    bake(){
        this.status = 'selesai dimasak'
    }

    getRecipeObj(){
        
    }
}

class Ingredients {
    constructor(options){
        this.name = options[1]
        this.amount = options[0]
        
    }

    
}

class PeanutButter extends Cookie {
    constructor(name, ingredients,sugar){
        super(name, ingredients,sugar)
        console.log(sugar)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients,sugar){
        super(name, ingredients,sugar)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name, ingredients,sugar){
        super(name, ingredients,sugar)
        this.other_count = 150
    }
}

class CookieFactory {
    constructor(){
       
    }
    static create(options){
        let products = []
        let productName = []
        let productIngredients = []
        let recipeBaru = []
        let recipeObj = []
        let sugar = false

        for (var i = 0; i < options.length - 1; i ++){
            let split = options[i].split("=")
            productName.push(split[0])
            productIngredients.push(split[1])
        }


        
        // products.push(pB);
        // products.push(chocoChip);
        // products.push(chocoCheese);
        // products.push(chocoButter);
        
        productIngredients.forEach(bahan =>{
            recipeBaru.push(bahan.split(','))
        })
        for(var i = 0; i < recipeBaru.length;i++){
            recipeObj[i] = []
            for(var j = 0; j < recipeBaru[i].length;j++){
                recipeObj[i].push(new Ingredients(recipeBaru[i][j].split(":")))
            }
        }
        
        // return recipeObj
        for(var y = 0; y < productName.length; y++){
            sugar = false
            if(productName[y] == 'peanut butter '){
                for(var f = 0; f < recipeObj[y].length;f++){
                    if(recipeObj[y][f].name == ' sugar'){
                        sugar = true
                        }
                }
               
                products.push(new PeanutButter(productName[y],recipeObj[y],sugar))
                
                
            }
            else if(productName[y] == 'chocolate chip '){
                for(var f = 0; f < recipeObj[y].length;f++){
                    if(recipeObj[y][f].name == ' sugar'){
                        sugar = true
                        }
                }
                products.push(new ChocolateChip(productName[y],recipeObj[y],sugar))
            }
            else{
                for(var f = 0; f < recipeObj[y].length;f++){
                    if(recipeObj[y][f].name == ' sugar'){
                        sugar = true
                        }
                }
                products.push(new OtherCookie(productName[y],recipeObj[y],sugar))
            }
        }
        return products
    }
    

    static cookieRecommendation(day, batch){
        let diet = day
        let dietProducts = []
        if(diet == 'tuesday'){
           return batch.filter(noSugar => {
                return noSugar.has_sugar == false
            })

        }
        else{
            return batch.filter(sugar =>{
                return sugar.has_sugar == true
            })
        }
       
        // return dietProducts
    }
    getRecipeObj(options){ //manggil recipe
        let productIngredients = []
        let productIngredientsBaru = []
        for (var i = 0; i < options.length - 1; i ++){
            let split = options[i].split("=")
            
            productIngredients.push(split[1])
        }
        // return productIngredients
        
        let sugar
        let ingredientsObj = []
        
        for(var j = 0; j < productIngredients.length; j++){
            
                
                productIngredientsBaru[j] = productIngredients[j].split(",")
                console.log(productIngredientsBaru)
                // for(var x = 0; x < productIngredientsBaru.length;x++){
                //     let recipeArr = productIngredientsBaru[x].split(" : ")
                    
                //    if(recipeArr[1] == 'sugar'){
                //        sugar = true
                //    }
                //    else{
                //        sugar = false
                //    }
                    
                //     let recipeObj = {
                //         name : recipeArr[1],
                //         amount: recipeArr[0],
                //         has_sugar: sugar
                //     }
                //     // console.log(recipeObj)
                //     ingredientsObj.push(recipeObj)
                
               
                
                
            
                // }
            }
        // return ingredientsObj
        
           
    
    }
}



let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies)
// let recipe = new CookieFactory().getRecipeObj(options)
// let b = new ingredient(recipe)
// console.log(recipe)



let sugarFreeFoods = CookieFactory.cookieRecommendation("sunday" , batch_of_cookies)
console.log(sugarFreeFoods)
// console.log("sugar free cakes are: ")
// for(let i = 0; i < sugarFreeFoods.length; i++){
//     console.log(sugarFreeFoods[i].name)
// }


