const mongoose = require('mongoose');
const Users = require('./models/User.model');
console.log('test')

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://tushar:tushutushu@cluster0.x05ig.mongodb.net/tt?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  userNewUrlParser: true
});

const userImport = [
  {
    first_name: "tushu",
    last_name: 'patel',
    password: "1234456",
    email: "tushupatel@gmail.com",
    phone: 13456789,
  },
  {
    first_name: "balo",
    last_name: "patel",
    password: "guess",
    email: "balopatel@gmail.com",
    phone: 123456955,
  }
 ]


Users.insertMany(userImport)
  .then(userImport => {
    console.log(`Success! Added `);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
