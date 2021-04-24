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
    amount : {
        type : Number,
        required : true,
        unique : false
    },
    dateAdd: {
        type: Date,
        required: false,
        unique: false,
        default: Date.now
    },
    comments: {
     type :String,
     required :false,
     unique :false,
     default : 'No Comment'
    }
})

const transactionModel  = mongoose.model('transactions',transactionSchema);
module.exports= transactionModel;