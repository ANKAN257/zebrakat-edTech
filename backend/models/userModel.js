const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email: { type: String, required: true, unique: true, lowercase: true },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define possible roles: user or admin
        default: 'user' // Set the default role to 'user'
      },
    password: { type: String, required: true },
    
});
userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
});
module.exports = mongoose.model('User', userSchema);
