const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    passport : {
        type : String,
        required : true,
        unique: true,
    },
    balance : {
        type : Number,
        required : false,
        unique: false,
        default : 0
    },
    credit : {
        type : Number,
        required : false,
        unique: false,
        default : 0
    },
    isActive : {
        type: Boolean,
        required: false,
        unique: false,
        default: true
    }
})

const accountModel  = mongoose.model('accounts',accountSchema);
module.exports= accountModel;