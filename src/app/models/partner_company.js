const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const PartnerSchema = new mongoose.Schema({       
    user: {
        type: mongoose.Schema.Types.ObjectId,        
        ref:'user',
        require: false,
    },
    company_Name: {
        type: String,                
        require: true,
    },
    approved: {
        type: Boolean,                
        require: false,
    },
    responsible: {
        type: String,                
        require: false,
    },
    promotional_Code: {
        type: String,                
        require: false,
    },    
    zip_Code: {
        type: String,                
        require: false,
    },
    address: {
        type: String,                
        require: false,
    },    
    date_expiration_promotional_code: {
        type: Date,                
        require: false,
    },
    company_activity: {
        type: String,                
        require: false,
    },
    commission: {
        type: String,                
        require: false,
    },
    

});

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;