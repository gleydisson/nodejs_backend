const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }, 
    
    Repassword: {
        type: String,
        required: true,
        select: false,
    }, 

    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    cellPhone: {
        type: String,
        required: true,
        select: false,
    },
    administrator: {
        type: String,
        require: false,
    },
    driver: {
        type: Boolean,
        require: false,
    },
    
});

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const user = mongoose.model('user', UserSchema);

module.exports = user;