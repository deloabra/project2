// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findAll(
        {
          where: {
            id: req.user.id
          }
        },
        {
          attributes: ["id", "email", "name", "interest", "goal", "goalUnit", "goalProgress", "goalCreatedAt"]
        })
        .then(function(data){
          res.json(data[0]);
        });
    }
  });

  //Assumes req.body has interest, goal, goalUnit
  //Creates a new goal
  app.patch("/api/goalCreate", function(req, res){
    db.User.update({
      interest: req.body.interest,
      goal: req.body.goal,
      goalUnit: req.body.goalUnit,
      goalProgress: 0,
      goalCreatedAt: db.sequelize.fn("NOW")
    },
    {
      where: {
        //change this to user.id
        id: req.user.id
      }
    })
      .then(function(result){
        if(result.affectedRows === 0){
          res.status(500).end();
        }
        else{
          res.status(200).end();
        }
      });
  });

  //Updates the goal progress
  app.patch("/api/goalUpdate", function(req, res){
    db.User.update({goalProgress: req.body.goalProgress},
      {where: {id: req.user.id}})
      .then(function(result){
        if(result.affectedRows === 0){
          res.status(500).end();
        }
        else{
          res.status(200).end();
        }
      });
  });

  app.get("/api/messages", function(req, res){
    db.messages.findAll({include: db.User})
      .then(function(messages){
        res.json(messages);
      });
  });

  app.post("/api/messages", function(req, res){
    db.messages.create({
      UserId: req.body.UserId,
      message: req.body.message
    })
      .then(function(result){
        if(result.affectedRows === 0){
          res.status(500).end();
        }
        else{
          res.status(200).end();
        }
      });
  });
};
