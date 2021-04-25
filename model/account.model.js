const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const accountSchema = mongoose.Schema({
    passport : {
        type : String,
        required : true,
        unique: true,
    },
    name: {
        type : String,
        required : true,
        unique: true,
    },
    password : {                   //add validtation later
        type : String,
        required : true,
        unique : true,
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

accountSchema.statics.findByCredentials = async (givenPassport,givenPassword) => {
    const user = await accountModel.findOne({passport:givenPassport})

    if(!user) {
        throw new  Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(givenPassword , user.password)

    if(!isMatch) {
        throw new Error('Unable to Login')
    }

    return user
}

accountSchema.pre('save', async function (next) {
   const user = this

   if(user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
   }

   next()
})

const accountModel  = mongoose.model('accounts',accountSchema);
module.exports= accountModel;