var mongoose = require('mongoose')

// genre schema
var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true
  },
  pages: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// get books
module.exports.getBooks = function(callback, limit) {
  Book.find(callback).limit(limit);
}

// get book by id
module.exports.getBookById = function(id, callback) {
  Book.findById(id, callback);
}

//add book
module.exports.addBook = function(book, callback) {
  Book.create(book, callback);
}

//update book
module.exports.updateBook = function(id, book, options, callback) {
  var query = {_id: id};
  var update = {
    title: book.title,
    genre: book.genre,
    description: book.description,
    author: book.author,
    pages: book.pages,
  }
  Book.findOneAndUpdate(query, update, options, callback);
}

//delete books
module.exports.deleteBook = function(id, callback) {
  var query = {_id: id};
  Book.remove(query, callback);
}
