let express = require('express');
let router = express.Router();
// let mongojs = require('mongojs');
// let db = mongojs('mongodb://admin:admin@ds139267.mlab.com:39267/food', ['Foods']);
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let foodSchema = new Schema({
	businessName: String,
	foodName: String,
	foodType: String,
	price: Number,
	description: String,
	imageUrl: String
});
let Food = mongoose.model('Food', foodSchema);

router.get('/foods', (req, res) => {
	Food.find((err, foods) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(foods);
	});
});

router.get('/foods/:businessName', (req, res) => {
	let businessName = req.params.businessName;

	// Food.aggregate([
	// 	{
	// 		$lookup:
	// 		{
	// 			from: "businesses",
	// 			localField: "businessName",
	// 			foreignField: "businessName",
	// 			as: "business"
	// 		}
	// 	}
	// ]).exec((err, result) => {
	// 	console.log(result)
	// 	res.send(result);
	// });


	Food.find({ 'businessName': businessName }, (err, foods) => {
		if (err) {
			res.status(500).send(err);
		}
		console.log(foods);
		res.send(foods);
	})
})

router.post('/food', (req, res) => {
	//console.log('inside db');
	let food = req.body;
	//console.log(food);
	Food.create(food, (err, foodResult) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(foodResult);
		//
		console.log('saved to db');
	})
});

module.exports = router;