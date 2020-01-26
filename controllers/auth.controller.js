const router = require('express').Router();
const studentController = require('../controllers/student-controller');
const User = require('../db').User;
const passport = require('passport');
const authController = require('../controllers/auth.controller');



exports.registerPage = (req, res) => res.render('register');

exports.registerUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.register(username, password, (error, registeredUser) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
    
    req.flash('success', 'Welcome new user ' + username + '!');
    next();
  });
};

exports.loginPage = (req, res) => res.render('login', { flashes: req.flash('error') });



exports.loginUser = passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login', 
  failureFlash: true, // Creates flash messages available on the 'error' key. req.flash('error')
  successFlash: 'Welcome!', // Creates flash messages available on the 'success' key. req.flash('success')
});



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