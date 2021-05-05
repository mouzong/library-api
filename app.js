const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Book = require("./Models/Book.Model");
const port = 8001;

const app = express();
const db = "mongodb://localhost:27017/bookdb";

app.use(express.json());

mongoose
  .connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Serve to database successfully");
  });

//Routes
app.get("/", (req, res) => {
  res.send("Happy Hacking");
});

//get all books
app.get("/books", (req, res) => {
  Book.find({}).exec((err, books) => {
    if (err) {
      res.send("An error occured");
    } else {
      res.json(books);
    }
  });
});

//get a book by id
app.get("/books/:id", (req, res) => {
  Book.findOne({
    _id: req.params.id,
  }).exec((err, book) => {
    if (err) {
      res.send("An error occured");
    } else {
      res.json(book);
    }
  });
});

//add a book to the collection
app.post("/books", (req, res) => {
  let newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save((err, book) => {
    if (err) {
      console.log("An error occured when saving the book");
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

//update a book
app.put("/books/:id", (req, res) => {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { title: req.body.title } },
    { upsert: true },
    (err, newBook) => {
      if (err) {
        console.log("An error occured while updating");
      } else {
        console.log(newBook);
        res.send(newBook);
      }
    }
  );
});

//delete a book from its _id
app.delete("/books/:id", (req, res) => {
  Book.findOneAndRemove({ _id: req.params.id }, (err, book) => {
    if (err) {
      console.log("Error deleting the book" + err.message);
      res.send(err.message);
    } else {
      res.status(204).send("Deletion successful");
    }
  });
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
