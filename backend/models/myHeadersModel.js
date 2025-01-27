const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// MyHeader Schema
const myHeaderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  myHeaderTitle: {
    type: String,
    required: true,
  },
  myHeaderLink: {
    type: String,
    required: true,
  }
});

 module.exports=mongoose.model('MyHeaders', myHeaderSchema);


