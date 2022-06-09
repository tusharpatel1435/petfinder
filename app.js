require("dotenv/config");
const cors = require('cors');

require("./db");
const express = require("express");
const app = express();


require("./config")(app);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./db/index');

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use(
  cors({
    
    origin: ['/']
  })
);

app.use(session({
  secret: 'secretidhere', 
  resave: false, 
  saveUninitialized: false,
    
    resave: true,
    store: MongoStore.create({
      
      mongoUrl: process.env.MONGODB_URI || "mongodb+srv://tushar:tushutushu@cluster0.x05ig.mongodb.net/tt?retryWrites=true&w=majority"
    })
  })
)


// passport configuration
const User = require('./models/User.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
  done(null, user._id);
});


passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    // login
    User.findOne({ username: username })
      .then(user => {
        if (user === null) {
          // there is no user with this username
          done(null, false, { message: 'Wrong Credentials' });
        } else if (!bcrypt.compareSync(password, user.password)) {
          // the password is not matching
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          // the userFromDB should now be logged in
          done(null, user)
        }
      })
      .catch(err => { console.log(err) })
  })
)

app.use(passport.initialize());
app.use(passport.session());


const allRoutes = require("./routes");
app.use("/api", allRoutes);

const auth =  require('./routes/auth');
app.use('/api/auth', auth)

require("./error-handling")(app);

app.use((req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
