const accounts = require('../model/account.model')
const transacions = require('../model/trasactions.model')


const loginUser = async (req,res) => {
     const {passport,password} =  req.body
     try {
          const user = await accounts.findByCredentials(passport,password)
          const token = await user.generateToken()
          res.status(200).json({success: "Yoou now logged in" , token})
     } 
     catch(err) {
        res.status(200).json({error : "Incorrect Inputs"})
     }
   
}
const addNewAccount = async (req, res) => {
    const {password} = req.body
     if(req.params.passport.length > 5) {
         if (req.params.name.length>2) {
            const newAccount = new accounts({
                passport : req.params.passport,
                name :req.params.name,
                password : password
             });
         
             try {
                 console.log(newAccount)
                const token = await newAccount.generateToken()
                await newAccount.save()
                res.status(200).json({success: "New Account was Succesfully created" ,token})
             } 
             catch (err){
                 res.json({err : 'err'})
             }
         }  else {return res.json({error : "Please insert a valid name"})}
       
     } else {return res.json({error : "Passport must be with a minimun of 6 digits"})}
   
}

const getAll = async (req,res) => {
    try {
        const data = await accounts.find({})
        res.send(data)
    } 
    catch(err) {
        res.send(err)
    }
}

const getAccountByPassport = async (req,res) => {
    const asked = req.params.passport
    try {
        const account = await accounts.findOne({passport : asked})
        if(account) {
            res.send(account)
        }else {
            res.json({error : "Account does not exist"})
        }
       
    }
    catch(err) {
        res.send(err)
    }
}

const getClientTransactions = async (req,res) => {
    const asked = req.params.passport
    try {
        const transactions = await transacions.find({account : asked})
        if(transactions) {
            res.send(transactions)
        }else {
            res.json({error : "Account does not exist"})
        }
       
    }
    catch(err) {
        res.send(err)
    }
}

const accountExist = async (passport) => {
    const account = await accounts.findOne({passport : passport})
    return account
}

const deposit = async (req, res) => {
    const askedAccount = req.params.passport
    const {amount} = req.body
    const exist = await accountExist(askedAccount);
    console.log(exist)
    if (amount>0) {
        if(exist) {
            try {
                await accounts.updateOne({passport: askedAccount}, {$inc: {"balance": amount}});
                 const newTrasacion =  new transacions({
                     account : askedAccount,
                     action : 'Credit',
                     amount : amount,
                 })
                 await newTrasacion.save()
                 res.json({success : `Deposit of ${amount} was updated for account ${askedAccount}`})
             }
             catch(err) {
                res.send(err)
             }
        } else {return res.json({error : "Account does not exist"})}
       
    } else {return res.json({error : "Amount must has a positive value"})}
}

const withdrawl = async (req, res) => {
    const askedAccount = req.params.passport
    const {amount} = req.body
    const exist = await accountExist(askedAccount);
    if (amount>0) {
        if(exist) {
            if(exist.balance + exist.credit >= amount) {
                try {
                    await accounts.updateOne({passport: askedAccount}, {$inc: {"balance": -amount}});
                     const newTrasacion =  new transacions({
                         account : askedAccount,
                         action : 'Debit',
                         amount : amount,
                     })
                     await newTrasacion.save()
                     res.json({success : `Withdrawal of ${amount} was updated for account ${askedAccount}`})
                 }
                 catch(err) {
                    res.send(err)
                 }
            } else {return res.json({error : "Client does not have sufficient funds for this action"})}
         
        } else {return res.json({error : "Account does not exist"})}
       
    } else {return res.json({error : "Amount must has a positive value"})}
}

const updateCredit = async (req, res) => {
    const askedAccount = req.params.passport
    const {amount} = req.body
    const exist = await accountExist(askedAccount);
    if (amount>0) {
        if(exist) {
            try {
                await accounts.updateOne({passport: askedAccount}, {$set: {"credit": amount}});
                res.json({success : `Credit of ${amount} was updated for Account ${askedAccount}`})
             }
             catch(err) {
                res.send(err)
             }
        } else {return res.json({error : "Account does not exist"})}
       
    } else {return res.json({error : "Amount must has a positive value"})}
}

const transfer = async (req,res) => {
    const askedAccount = req.params.passport
    const {toAccount ,amount} = req.body
    const sender = await accountExist(askedAccount);
    const reciever = await accountExist(toAccount);
    if (amount>0) {
        if (sender && reciever) {
            if(sender.credit + sender.balance >= amount) {
                try {
                 await accounts.updateOne({passport: askedAccount}, {$inc: {"balance": -amount}});
                 await accounts.updateOne({passport: toAccount}, {$inc: {"balance": amount}});
     
                 const senderTrasaction =  new transacions({
                     account : askedAccount,
                     action : 'Debit',
                     amount : amount,
                     comments : `To ${toAccount}`
                 })
     
                 const reaciveTrasaction =  new transacions({
                     account : toAccount,
                     action : 'Credit',
                     amount : amount,
                     comments : `From ${askedAccount}`
                 })
     
     
                 await senderTrasaction.save()
                 await reaciveTrasaction.save()
     
                 res.json({success : `Transfer of ${amount} was made from Account ${askedAccount} to ${toAccount}`})
     
                } catch(err) {
                 res.send(err)
                }
            }
         } else {return res.json({error : "One or Two of the accounts not exist"}) }
    } else { return res.json({error : "Amount must be with a positive value"})}
}

const deleteAccount = async (req ,res) => {
    const askedAccount = req.params.passport
    const exist = await accountExist(askedAccount);
    if (exist) {
        try {
             await accounts.deleteOne({passport : askedAccount} , function(err,quesstion) {
                 if (err) throw err;
                 res.send(quesstion)
             })
        }
         catch(err) {
            res.send(err)
        }
    }
}

module.exports = {
    getAll,
    getAccountByPassport,
    addNewAccount,
    deposit,
    updateCredit,
    withdrawl,
    transfer,
    getClientTransactions,
    deleteAccount,
    loginUser
}