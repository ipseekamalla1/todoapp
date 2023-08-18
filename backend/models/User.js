const { default: mongoose } = require("mongoose");
const connectToMongo = require("mongoose");

const UserSchema = new connectToMongo.Schema({
  firstName: {
    type: String,
    required: true,
  
  },
 lastName: {
    type: String,
    required: true,
  
  },


  userName: {
    type: String,
    required: true,
  
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,   
    
  },


  phoneNumber: {
    type: Number,
    required: true,
  
  },

  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },

  dateAdded: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);

module.exports = User;
