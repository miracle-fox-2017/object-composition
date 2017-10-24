//your code here
const fs = require('fs');

class Cookie
{
  constructor(name, ingredients)
  {
    this.name = name;
    this.status = "mentah";
    this.ingredients = ingredients;
    this.has_sugar = this.checkSugar(ingredients);
  }

  checkSugar(ingredients)
  {
    if (ingredients.length === 0)
    {
      return false;
    }
    if (ingredients[0].name === " sugar")
    {
      return true;
    }
    return this.checkSugar(ingredients.slice(1));
  }

  bake()
  {
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie
{
  constructor(name, ingredients)
  {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie
{
  constructor(name, ingredients)
  {
    super(name, ingredients);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie
{
  constructor(name, ingredients)
  {
    super(name, ingredients);
    this.otherCount = 150;
  }
}


class CookieFactory
{
  static create(options)
  {
    let cookiesObject = [];
    for (let i = 0; i < options.length; i++)
    {
      let temp = this.getIngredients(options[i][1]);
      if (options[i].toString().trim().split(',')[0] === "peanut butter ")
      {
        cookiesObject.push(new PeanutButter(options[i][0], this.getIngredients(options[i][1])));
      }
      else if (options[i].toString().trim().split(',')[0] === "chocolate chip ")
      {
        cookiesObject.push(new ChocolateChip(options[i][0], this.getIngredients(options[i][1])));
      }
      else
      {
        cookiesObject.push(new OtherCookie(options[i][0], this.getIngredients(options[i][1])));
      }
    }
    return cookiesObject;
  }

  static getIngredients(ingredients)
  {
    let ingreds = ingredients.split(',')
    let ingredientsObjects = [];
    for (let i = 0; i < ingreds.length; i++)
    {
      //{name : ingreds[i].split(':')[1], amount : ingreds[i].split(':')[0]}
      ingredientsObjects.push(new Ingredients({name : ingreds[i].split(':')[1], amount : ingreds[i].split(':')[0]}))
    }
    return ingredientsObjects;
  }

  static cookieRecommendation(day, cookies)
  {
    if (day !== "tuesday")
    {
      return "sorry, cannot find one"
    }
    let cookiesResult = [];
    if (cookies.length === 0)
    {
      if (cookiesResult.length === 0)
      {
          return "sorry cannot find one";
      }
      else
      {
          return cookiesResult;
      }
    }
    if (!cookies[0].has_sugar)
    {
        cookiesResult.push(cookies[0]);
    }
    return cookiesResult.concat(this.cookieRecommendation(day, cookies.slice(1)));
  }
}

class Ingredients
{
  constructor(options)
  {
    this.name = options["name"];
    this.amount = options["amount"];
  }

}

options = fs.readFileSync('./cookies.txt', "UTF-8").toString().split("\n");

let pasangan = [];

for (var i = 0; i < options.length; i++)
{
  pasangan.push(options[i].split('='));
}

let batch_of_cookies = CookieFactory.create(pasangan);
// console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :");

for (let i = 0; i < sugarFreeFoods.length; i++)
{
  console.log(sugarFreeFoods[i].name);
}