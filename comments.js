// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a connection to MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'commentdb';
let db;
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comment = { name: req.body.name, content: req.body.content };
  db.collection('comments').insertOne(comment, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
}); 
// Get all comments
app.get('/comments', (req, res) => {
  db.collection('comments').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});
