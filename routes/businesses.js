let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };     
mongoose.connect('mongodb://admin:admin@ds139267.mlab.com:39267/food', options, (err) => {
	if (err) {
		throw new Error(err);
	}
	console.log('Database connected');
});
let Schema = mongoose.Schema;
let businessSchema = new Schema({
	userId: String,
	businessName: String,
	facebookLink: String,
	minDeliveryOrder: Number,
	prefLocation: String,
	description: String
});
let Business = mongoose.model('Business', businessSchema);

router.get('/businesses', (req, res) => {
	Business.find((err, businesses) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(businesses);
	});
});

router.get('/businesses/:userId', (req, res) => {
	const userId = req.params.userId;
	Business.find({'userId': userId}, (err, businesses) => {
		if (err) {
			res.status(500).send(err);
		}
		//console.log(businesses);
		res.send(businesses);
	})
})

router.post('/business', (req,res, next) => {
	//console.log('inside db');
	let user = req.body;
	//console.log(user);
		Business.create(user, (err, user) => {
			//console.log('saved to db');
			if (err) {
				res.status(500).send(err);
			}
			res.json(user);
		})
});


module.exports = router;