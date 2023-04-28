const express = require('express')
const  {connectToDb, getDb} = require('./db')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

const app = express()

//middleware
app.use(express.json());

let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})


app.get('/api', (req,res) => {
  res.json({
    message: 'Welcome'
  });
});

app.post('/api/posts', verifyToken, (req,res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'Post created',
        authData
      });
    }
  })
});

app.post('/api/login', (req,res) => {

  //Mock user
  const user = {
    id: 1,
    username: 'boy',
    email: 'boy@mail.com'
  }

  jwt.sign({user: user}, 'secretkey', (err, token) => {
    res.json({
      token
    })
  })
})


function verifyToken(req,res,next) {
  // get auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403)
  }
}

//routes
app.get('/books', (req,res) => {
    const page = req.query.p || 0
    const booksPerPage = 3

    let books = []
    db.collection('book')
      .find()
      .sort({author: -1})
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .forEach(book => books.push(book))
      .then(() => {
        res.status(200).json(books)
      })
      .catch(()=> {
        res.status(500).json({error: 'Could not fetch the documents'})
      })
})

app.get('/books/:id', (req,res) => {
        db.collection('book')
          .findOne({_id: new ObjectId(req.params.id)})
          .then(doc => {
            res.status(200).json(doc)
          })
          .catch(err => {
            res.status(500).json({error: 'Could not fetch the document'})
          })
})

//post 
app.post('/books', (req,res) => {
    const book = req.body
    console.log(book);

    db.collection('book')
      .insertOne(book)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not create a new document'})
      })
})

//DELETE
app.delete('/books/:id', (req,res) => {
    db.collection('book')
      .deleteOne({_id: new ObjectId(req.params.id)})
      .then(result =>{
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(500).json({error: 'Could not delete a item'})
      })
})

//patch
app.patch('/books/:id', (req,res) => {
    const updates = req.body

    db.collection('book')
      .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not update the document'})
      })
})