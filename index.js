// Lookup PASSPORT-LOCAL-SEQUELIZE DOCUMENTATION

require('dotenv').config();
require('./db');
const User = require('./db').User;
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const passport = require('passport');
const session = require('express-session');


const app = express();

app.use(session({ secret: 'chicken waffles' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');



app.use(express.urlencoded({ extended: true }));
app.use(routes);







const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}!`));

//! HOMEWORK
// ADD phone number to this.