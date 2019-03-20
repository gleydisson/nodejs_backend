const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const DriverSchema = new mongoose.Schema({   
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,        
        ref:'Itinerario',
        require: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,        
        ref:'User',
        require: false,
    },
    date_of_birth: {
        type: Date,                
        require: false,
    },
    approved: {
        type: Boolean,                
        require: false,
    },
    licence_Driver: {
        type: String,                
        require: false,
    },
    doc_Car: {
        type: String,                
        require: false,
    },
    
    car_insurance: {
        type: String,                
        require: false,
    },
    
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;