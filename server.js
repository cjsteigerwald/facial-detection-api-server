const express = require('express');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const proifle = require('./controllers/proifle');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'chrissteigerwald',
    password: '',
    database: 'smart-brain',
  },
});

// db.select('*')
//   .from('users')
//   .then((data) => {
//     console.log(data);
//   });

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  proifle.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
