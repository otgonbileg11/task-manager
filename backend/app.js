const express = require('express')
const  {connectToDb, getDb} = require('./db')
const { ObjectId } = require('mongodb')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('./users')
const { requireAuth } = require('./auth')

const app = express()

//middleware
app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser())

function handleErrors(err) {
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};
  //duplicate error while sign up
  if(err.code === 11000) {
    errors.email = 'the email is already registered';
    return errors;
  }
  //incorrect email while login
  if (err.message === 'incorrect email') {
    errors.email = 'email is not registered'
  }
  //incorrect password while login
  if (err.message === 'incorrect password') {
    errors.password = 'password is not correct'
  }

  //validation error while sign up
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties})=> {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

//create token
const SECRET_KEY = 'secret key for jwt' //will move it to env file
const maxAge = 3 * 24 * 60 * 60
function createToken(id) {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: maxAge
  })
}

let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

app.get('/tasks', requireAuth, (req,res) => {
  let tasks = []
  db.collection('tasks')
    .find()
    .sort({id: -1})
    .forEach(task => tasks.push(task))
    .then(() => {
      res.status(200).json(tasks)
    })
    .catch(()=> {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

app.post('/tasks', requireAuth, (req,res) => {
  db.collection('tasks')
  .insertOne({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    categories: req.body.categories,
    comments: req.body.comments
  })
  .then(result => {res.status(201).json(result)})
  .catch(error => res.json({error: 'Error'}))
})

app.delete('/tasks/:id', (req,res) => {
  db.collection('tasks')
    .deleteOne({_id: new ObjectId(req.params.id)})
    .then(result =>{
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({error: 'Could not delete a item'})
    })
})

// app.use(session({
//   secret: 'my-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

 //Signup
 app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({email, password})
    const token = createToken(user._id)
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   maxAge: maxAge * 1000
    // })
    res.status(201).json({user: user._id, token: token})
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
 });

 //Login
 app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({user: user._id, token: token})
  }
  catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
  }
 });
