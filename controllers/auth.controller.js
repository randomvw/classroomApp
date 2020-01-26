const router = require('express').Router();
const studentController = require('../controllers/student-controller');
const User = require('../db').User;
const passport = require('passport');
const authController = require('../controllers/auth.controller');



exports.registerPage = (req, res) => res.render('register');

exports.registerUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.register(username, password, (error, registeredUser) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }

    res.send("Created user: " + username);
  });
};

exports.loginPage = (req, res) => res.render('login');

exports.loginUser = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

exports.logout = (req, res) => {
  req.logout(); // logout is provided by passport
  res.redirect('/login');
};



// req.isAuthenticated()
exports.isLoggedIn = (req, res, next) => {
  // if the request is authenticated then pass to the next mdidleware or controller
  // isAuthenticated is provided by passport
  if (req.isAuthenticated()) {
    return next();
  }
  // otherwise redirect the inauthenticated user to the login page
  res.redirect('/login');
}