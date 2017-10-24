const Cookie = require('./cookie')

class OtherCookie extends Cookie{
	constructor(name, ingredients){
		super(name, ingredients)
		this.other_count = 150
	}
}

module.exports = OtherCookie