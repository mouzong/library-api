# library-api
after cloniong the repo create a folder inside your root folder and name it `Models` and inside create a `Book.Model.js` file and paste the folling code inside: 

`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  category: String,
});

module.exports = mongoose.model("Book", BookSchema);

`
