const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Book = mongoose.model("Book", {
  title: { type: String, required: true },
  author: { type: String, required: true }
});

app.get("/", (req, res) => {
  res.send("Library API Running");
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/books", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const books = await Book.insertMany(req.body);
      res.json(books);
    } else {
      const book = await Book.create(req.body);
      res.json(book);
    }
  } catch (error) {
    res.status(500).send("Error adding books");
  }
});

// 🔥 DELETE ROUTE ADDED HERE
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
