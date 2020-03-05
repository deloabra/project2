// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    else{
      res.render("signup", {object:req});
    }
  });

  app.get("/index", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index",{object:req});
    }
    else{
      res.render("signup", {object:req});
    }
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    else{
      res.render("login", {object:req});
    }
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    db.sequelize.query("select messages.message, Users.email, Users.name FROM messages INNER JOIN Users on messages.UserId = Users.id")
      .then(function(results){
        console.log(results[0]);
        res.render("members", {messages:results[0]});
      });
  });
};
