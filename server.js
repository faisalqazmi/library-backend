const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Book = mongoose.model("Book", {
  title: String,
  author: String
});

app.get("/", (req, res) => {
  res.send("Library API Running");
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/books", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
