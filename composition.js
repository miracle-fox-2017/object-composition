//your code here
const fs=require("fs");

class Cookie{
    constructor(){
        this.status="mentah";
    }
    bake(){
        this.status="matang";
    }
}

class Ingredient{
    constructor(bahan,sugar){
        this.name=bahan[1];
        this.amount=bahan[0];
        this.hasSugar=sugar;
    }
    ingredientsList(){
        return this;
    }
}

//================================> Peanut Butter
class PeanutButter extends Cookie{
    constructor(name){
        super();
        this.name=name;
        this.ingredients=[];
        this.peanutCount=100;
    }
    pushIngredients(ingredients){
        this.ingredients.push(ingredients);
        return this;
    }
    selesai(){
        this.bake();
    }
}

//================================> Chocolate Chips
class ChocolateChip extends Cookie{
    constructor(name){
        super();
        this.name=name;
        this.ingredients=[];
        this.chocChipCount=200;
    }
    pushIngredients(ingredients){
        this.ingredients.push(ingredients);
        return this;
    }
    selesai(){
        this.bake();
    }
}

//================================> Other Cookies
class OtherCookies extends Cookie{
    constructor(name){
        super();
        this.name=name;
        this.ingredients=[];
        this.chocChipCount=150;
    }
    pushIngredients(ingredients){
        this.ingredients.push(ingredients);
        return this;
    }
    selesai(){
        this.bake();
    }
}

class CookieFactory{
    static readFileArr(file){ // Read file and then split into string
        let arr=fs.readFileSync(file).toString().split("\n");
        if(arr[arr.length - 1].length == 0){
            arr.pop();
        }
        return arr;
    }
    static create(input){ // Create Array of Object
        let listCookies=[];
        const arr=this.readFileArr(input);
        for(let i=0;i < arr.length;i++){
            let bahan=[];
            const tempName=arr[i].split("=")[0];
            const cookieName=tempName.slice(0,tempName.length - 1);
            const ingredients=arr[i].split(/[=,:]/g).slice(1);
            const peanutButter=new PeanutButter(cookieName);
            const chocolateChip=new ChocolateChip(cookieName);
            const otherCookies=new OtherCookies(cookieName);
            for(let j=0;j < ingredients.length;j++){
                if(j % 2 != 0){
                    bahan.push(ingredients[j])
                }
            }
            for(let j=0;j < ingredients.length;j++){
                if(j % 2 == 0){
                    const listBahan=new Ingredient(ingredients.slice(j,j + 2),bahan.includes("sugar"));
                    peanutButter.pushIngredients(listBahan).selesai();
                    chocolateChip.pushIngredients(listBahan).selesai();
                    otherCookies.pushIngredients(listBahan).selesai();
                }
            }
            if(cookieName == "peanut butter"){
                listCookies.push(peanutButter);
            }else if(cookieName == "chocolate chip"){
                listCookies.push(chocolateChip);
            }else{
                listCookies.push(otherCookies);
            }
        }
        return listCookies;
    }
    static cookieRecomendation(day,arrOfObj){
        let cookies=[];
        if(day == "tuesday"){
            for(let i=0;i < arrOfObj.length;i++){
                if(arrOfObj[i].ingredients[0].hasSugar !== true){
                    cookies.push(arrOfObj[i].name);
                }
            }
            return cookies;
        }else{
            for(let i=0;i < arrOfObj.length;i++){
                if(arrOfObj[i].ingredients[0].hasSugar === true){
                    cookies.push(arrOfObj[i].name);
                }
            }
            return cookies;
        }
    }
}

const batchOfCookies=CookieFactory.create("cookies.txt");
//console.log(batchOfCookies);
const sugarFreeFoods=CookieFactory.cookieRecomendation("monday",batchOfCookies);
console.log("Sugar Free Cookies Are :");
console.log(sugarFreeFoods);
