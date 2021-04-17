const express = require('express');
const router = express.Router();
const dataJSON = require('../accounts.json');
const controllers = require('../controllers/controllers')

router.get('/', (req,res) => {
    return res.send(dataJSON.accounts)
}).get('/accounts/:passport' , (req , res) => {
    return res.send(controllers.getAccountByPassport(req))
}).post('/:passport' , (req,res) => {
    if(req.params.passport.length>=6) {
        controllers.addNewAccount(req,res);
    } else {res.status(200).json({ error: 'Invalid Passport, must include min 6 chars' })}
}).put('/accounts/:passport/deposit/:amount' , (req,res) => {
    if(req.params.amount>0) {
        controllers.deposit(req,res);
    } else {res.status(200).json({ error: 'Despoit must be with a positive value' })} 
}).put('/accounts/:passport/credit/:amount' , (req,res) => {
    if(req.params.amount>0) {
    controllers.updateCredit(req,res)
    }else {res.status(200).json({ error: 'Credit must be with a positive value' })} 
}).put('/accounts/:passport/withdraw/:amount' , (req,res) => {
    if(req.params.amount>0) {
        controllers.withdrawl(req,res)
    } else {res.status(200).json({ error: 'Withdrawl must be with a positive value' })} 
}).put('/accounts/:passport1/transfer/:amount/:passport2',(req,res) => {
    if(req.params.amount>0){
        controllers.transfer(req,res)
    }else {res.status(200).json({ error: 'Transfer must be with a positive value' })} 
}).get('/accounts/search/:amount',(req,res) => {
    controllers.getClientsByAmount(req,res)
})

module.exports = router;