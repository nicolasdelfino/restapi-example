var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');
// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore')
var db = mongoose.connection;

app.get('/', function(req, resp) {
  resp.send('Please use /api/books or /api/genres')
})

////////////////////////////////////////////////////////////////////
// GENRES
////////////////////////////////////////////////////////////////////

app.get('/api/genres', function(req, resp) {
  Genre.getGenres(function(error, genres) {
    if(error) {
      throw error;
    }
    resp.json(genres);
  });
})

app.post('/api/genres', function(req, resp) {
  var genre = req.body;
  Genre.addGenre(genre, function(error, genre) {
    if(error) {
      throw error;
    }
    resp.json(genre);
  });
})

app.put('/api/genres/:_id', function(req, resp) {
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {}, function(error, genre) {
    if(error) {
      throw error;
    }
    resp.json(genre);
  });
})

app.delete('/api/genres/:_id', function(req, resp) {
  var id = req.params._id;
  Genre.deleteGenre(id, function(error, genre) {
    if(error) {
      throw error;
    }
    resp.json(genre);
  });
})

////////////////////////////////////////////////////////////////////
// BOOKS
////////////////////////////////////////////////////////////////////

app.get('/api/books', function(req, resp) {
  Book.getBooks(function(error, books) {
    if(error) {
      throw error;
    }
    resp.json(books);
  });
})

app.get('/api/books/:_id', function(req, resp) {
  Book.getBookById(req.params._id, function(error, book) {
    if(error) {
      throw error;
    }
    resp.json(book);
  });
})

app.post('/api/books', function(req, resp) {
  var book = req.body;
  Book.addBook(book, function(error, book) {
    if(error) {
      throw error;
    }
    resp.json(book);
  });
})

app.put('/api/books/:_id', function(req, resp) {
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {}, function(error, book) {
    if(error) {
      throw error;
    }
    resp.json(book);
  });
})

app.delete('/api/books/:_id', function(req, resp) {
  var id = req.params._id;
  Book.deleteBook(id, function(error, book) {
    if(error) {
      throw error;
    }
    resp.json(book);
  });
})
////////////////////////////////////////////////////////////////////
// LISTEN ON PORT
////////////////////////////////////////////////////////////////////

app.listen(3000);
console.log('Running on port 3000');
