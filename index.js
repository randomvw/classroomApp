// Lookup PASSPORT-LOCAL-SEQUELIZE DOCUMENTATION

require('dotenv').config();
require('./db');
const User = require('./db').User;
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(session({ secret: 'chicken waffles' }));  // This is the express session
app.use(flash()); // npm install connect-flash
app.use(passport.initialize()); 
app.use(passport.session());
passport.use(User.createStrategy());  // This is the local strategy (username, password)

passport.use(new GithubStrategy({     // This is the Github strategy
  clientID: process.env.GITHUB_CLIENT ,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try{
    let results = await User.findOrCreate({ where: { username: profile.username } })
    let user = results[0];
    let isCreated = results[1];
    done(null, user);
  }
  catch (error) {
    done(error, null);
  }
}));

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