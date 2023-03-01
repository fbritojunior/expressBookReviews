const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    return /^[0-9a-zA-Z_.-]+$/.test(username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    for (user of users) {
        if (username === user.username && password === user.password) {
            return True;
        }
        else {
            return False
        }
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body.username;
    const pwd = req.body.password;
    isValid(user);

    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 });

      req.session.authorization = {
        accessToken
    }
    authenticatedUser(user,pwd);
    return res.status(200).send("User successfully logged in");
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //const review = req.query.reviews;
    let isbn = req.params.isbn;
    if(isbn) {
        const reviews = req.query.reviews;
        if (reviews) {
            books[isbn].reviews = reviews;
        }
        //books[isbn].reviews = review;
        res.send(`Book with the ${isbn} was updated.`);
    }
    else {
        res.send(`ISBN ${isbn} not found.`);
    }

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
