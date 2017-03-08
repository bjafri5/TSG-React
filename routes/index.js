let express = require('express');
let router = express.Router();

// router.get('*', (req,res) => {
// 	console.log(req);
// 	res.render('index.html');
// });

const domain = 'https://theswotsguide.herokuapp.com'

router.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect(domain + req.url);
  else
    next();
})

module.exports = router;