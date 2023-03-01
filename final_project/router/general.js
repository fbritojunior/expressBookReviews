const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    users.push({"username":req.body.username,"password":req.body.password});
    res.send("The user" + (' ') + (req.body.username) + " has been added!");
  //return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get("/login_auth", (req,res) => {
    res.send(users);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
    //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  var filtered_books = [];
  for (var i = 1; i < Object.keys(books).length+1; i++){
    if (books[i].author === author){
        filtered_books.push(books[i]);
    }
  } 
  res.send(filtered_books);
    //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    var filtered_titles = [];
    for (var i = 1; i < Object.keys(books).length+1; i++){
        if (books[i].title === title){
            filtered_titles.push(books[i]);
        }
    } 
    res.send(filtered_titles);
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
