const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/users');
const businesses = require('./routes/businesses');
const foods = require('./routes/foods');
const index = require('./routes/index');
const jwt = require('express-jwt');

const app = express();
const port = process.env.PORT || 5000;

const authCheck = jwt({
  secret: 'vQIB9Gu97wPZRQ30XAUmShAIU6L35PcjFNcBDzDQ5CBZbzlpP-N6e53O_XzQSQtx',
  audience: '0r7O6A4SiVTwjEG6LQDoGP7byPqHsSlY'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api', authCheck, users, businesses, foods);
app.use('/', index);

app.listen(port, () => console.log('Server started on port '+ port));
