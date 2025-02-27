const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
    loginTimes: [{
        time: { type: Date, default: Date.now },    
        latitude: { type: String }, 
        longitude: { type: String },
    }],
    logoutTimes: [{
        time: {type: Date, default: Date.now},
        latitude:{type: String},
        longitude:{type: String},

    }],
    authToken: { type: String },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema); 

module.exports = User;
