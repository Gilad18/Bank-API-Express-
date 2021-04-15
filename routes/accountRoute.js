const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataJSON = require('../accounts.json');
const controllers = require('../controllers/controllers')

router.get('/', (req,res) => {
    return res.send(dataJSON.accounts)
}).get('/accounts/:passport' , (req , res) => {
    return res.send(controllers.getAccountByPassport(req))
}).post('/:passport' , (req,res) => {
    controllers.addNewAccount(req,res);
}).put('/accounts/:passport/cash/:amount' , (req,res) => {
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
}).put('/accounts/:passport/transfer/:amount/:passport2',(req,res) => {
    if(req.params.amount>0){
        controllers.transfer(req,res)
    }else {res.status(200).json({ error: 'Transfer must be with a positive value' })} 
}).get('/accounts/search/:amount',(req,res) => {
    controllers.getClientsByAmount(req,res)
})

module.exports = router;