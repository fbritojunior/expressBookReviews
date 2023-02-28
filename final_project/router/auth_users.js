const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body.username;
    console.log(user);
    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 });

      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const reviews = req.params.reviews;
    const isbn = req.params.isbn;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    let reviews = req.query.reviews;
    
    if(reviews) {
        filtered_user.reviews = reviews;
    }
    
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    res.send(`Book with the ${isbn} was updated.`);
}
else{
    res.send("Unable to find user!");
}
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
