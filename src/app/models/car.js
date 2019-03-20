const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const CarSchema = new mongoose.Schema({       
    user: {
        type: mongoose.Schema.Types.ObjectId,        
        ref:'User',
        require: false,
    },
    Drivers: [{
        type: mongoose.Schema.Types.ObjectId,        
        ref:'Driver',
        require: false,
    }],
    model: {
        type: String,                
        require: true,
    },
    approved: {
        type: Boolean,                
        require: false,
    },
    brand: {
        type: String,                
        require: false,
    },
    number_of_seats: {
        type: String,                
        require: false,
    },    
    
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;