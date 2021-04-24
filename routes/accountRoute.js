const express = require('express');
const router = express.Router();
const dataJSON = require('../accounts.json');
const controllers = require('../controllers/controllers')

router.get('/', (req,res) => {
    controllers.getAll(req,res)
}).get('/accounts/:passport' , (req , res) => {
   controllers.getAccountByPassport(req,res)
}).post('/:passport/:name' , (req,res) => {
   controllers.addNewAccount(req,res);
}).put('/accounts/:passport/deposit/' , (req,res) => {
        controllers.deposit(req,res);
}).put('/accounts/:passport/credit/' , (req,res) => {
    controllers.updateCredit(req,res)
}).put('/accounts/:passport/debit/' , (req,res) => {
        controllers.withdrawl(req,res)
}).put('/accounts/:passport/transfer/',(req,res) => {
        controllers.transfer(req,res)
}).get('/accounts/search/:amount',(req,res) => {
    controllers.getClientsByAmount(req,res)
}).get('/accounts/:passport/transactions/' , (req,res) => {
    controllers.getClientTransactions(req,res)
})

module.exports = router;