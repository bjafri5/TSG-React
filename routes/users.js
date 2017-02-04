let express = require('express');
let router = express.Router();
let axios = require('axios');

router.patch('/updateAuthUser/:userId', (req, res) => {
	let userId = req.params.userId;
	let updatedUser = req.body;
	updateAuthProfile(userId, updatedUser)
		.then((updateResponse) => {
			//console.log('updateResponse:', updateResponse);
			res.json(updateResponse);
		})
		.catch((error) => {
			res.status(500).send(error);
		})
})

const tokenCredentials = {
	"client_id": "gv5Vs2sRkPfXvjm49GLaqZXte1QBLoOL",
	"client_secret": "fi9t0k-F1JFGzAnTUB-FI82uzODjefDtaueheKF6ufP3Yztceynt7eehUoI7qz-8",
	"audience": "https://bjafri5.auth0.com/api/v2/",
	"grant_type": "client_credentials"
};

let getToken = getAuthApiToken();

function getAuthApiToken() {
	return axios.post('https://bjafri5.auth0.com/oauth/token', tokenCredentials)
		.then((tokenResponse) => {
			setTimeout(() => {
				getToken = getAuthApiToken();
				console.log('refreshed token');
			}, (tokenResponse.data.expires_in * 1000) - 5000);
			console.log('recieved token');
			//console.log(tokenResponse.data);
			return tokenResponse;
		})
}

function updateAuthProfile(userId, updatedUser) {
	return getToken.then((token) => {
		console.log('updating user...');
		updatedUser.client_id = '0r7O6A4SiVTwjEG6LQDoGP7byPqHsSlY';
		updatedUser.email_verified = true;
		const config = {
			headers: { 'authorization': `${token.data.token_type} ${token.data.access_token}` }
		}
		return axios.patch(`https://bjafri5.auth0.com/api/v2/users/${userId}`, updatedUser, config)
			.then((updateResponse) => {
				//console.log(updateResponse);
				return updateResponse.data;
			})
			.catch((error) => {
				throw new Error(error);
			})
	})
}

module.exports = router;