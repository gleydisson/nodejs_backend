const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ItinerarioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,        
        ref:'user',
        require: false,
    },
    Drivers: [{
        type: mongoose.Schema.Types.ObjectId,        
        ref:'Driver',
        require: false,
    }],
    source: {
        type: String,
        require: true,
    },
    destiny: {
        type: String,
        required: true,    
    },
    
    price: {
        type: String,
        required: true,        
    },
    date_Transfer: {
        type: Date,
        required: true,        
    },
    date_Return: {
        type: Date,
        required: false,        
    },
    time_Transfer: {
        type: String,
        required: true,        
    },
    time_Return: {
        type: String,
        required: false,        
    },
    number_Adults: {
        type: String,
        required: true,        
    },
    number_children: {
        type: String,
        required: false,        
    },
    number_chair_children: {
        type: String,
        required: false,        
    },
    price_offer: {
        type: String,
        required: false,        
    },
    flight_number: {
        type: String,
        required: false,        
    },
    nameplate: {
        type: String,
        required: false,        
    },
    promotion_code: {
        type: String,
        required: false,        
    },
    comments: {
        type: String,
        required: false,        
    },
    email: {
        type: String,
        required: true,        
    },
    cellPhone: {
        type: String,
        required: false,        
    },
    amount_of_hours: {
        type: String,
        required: false,        
    },
    amount_of_luggage: {
        type: String,
        required: true,        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tipe_Payment: {
        type: String,
        required: false,
    },
    paid_Driver: {
        type: Boolean,
        required: true,
        default: false,
    },
    complete: {
        type: Boolean,
        required: true,
        default: false,
    },
    type_Transfer: {
        type: String,
        required: true,
        default: false,
    },
});

const Itinerario = mongoose.model('Itinerario', ItinerarioSchema);

module.exports = Itinerario;