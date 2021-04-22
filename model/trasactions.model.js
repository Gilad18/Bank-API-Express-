const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    account : {
        type : String,
        required : true,
        unique: false,
    },
    action : {
        type : String,
        required : true,
        unique : false
    },
    preBalance : {
        type : Number,
        required : true,
        unique : false
    },
    amount : {
        type : Number,
        required : true,
        unique : false
    },
    postBalance : {
        type : Number,
        required : true,
        unique : false
    }
})

const transactionModel  = mongoose.model('transactions',transactionSchema);
module.exports= transactionModel;