'use strict'
const ChocolateChip = require('./chocolate_chip')
const PeanutButter = require('./peanut_butter')
const OtherCookie = require('./other_cookie')
const fs = require('fs')

class CookieFactory {
	static create(options){
		let cookie = fs.readFileSync(options, 'utf8')
		let split_enter = cookie.split('\n')
		let bahan = []
		let cookies = []
		
		split_enter.forEach(item =>{
			bahan.push(item.split('='))
		})

		bahan.forEach(cookie=>{
			
			if(cookie[0].trim() == 'peanut butter'){
				cookies.push(new PeanutButter(cookie[0], cookie[1].split(',')))
			}
			else if(cookie[0].trim() == 'chocolate chip'){
				cookies.push(new ChocolateChip(cookie[0], cookie[1].split(',')))
			}else{
				cookies.push(new OtherCookie(cookie[0], cookie[1].split(',')))
			}
		})

		return cookies
	}

	static cookieRecommendation(day, batch){
		let arr = []

		batch.forEach(less =>{
			
			if(!less.has_sugar){
				arr.push(less)
			}
		})
		return arr
	}
}


let batch_of_cookies = CookieFactory.create('cookies.txt')
// console.log(batch_of_cookies)
// console.log(PeanutButter)

let sugarFreeFood = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are : ')

for(let i = 0; i < sugarFreeFood.length; i++){
	console.log(sugarFreeFood[i].name)
}