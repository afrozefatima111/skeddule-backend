const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema({
   username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true, //Always store data in lowercase
    index: true
  },
  password: {
    type: String,
    required: false,
    minlength: 6
  },
  
});
module.exports = mongoose.model("User", usersSchema);
