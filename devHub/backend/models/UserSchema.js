// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String
// });

// const User = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    
  });

  const User = mongoose.model('User', UserSchema);
  module.exports = User;