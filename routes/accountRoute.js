const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers')
const auth = require('../middleware/auth')

router.get('/', auth , (req,res) => {
    controllers.getAll(req,res)
}).get('/accounts/:passport' ,auth, (req , res) => {
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
}).delete('/accounts/:passport/delete' , (req,res)=> {
    controllers.deleteAccount(req,res)
}).post('/login' , (req,res) => {
    controllers.loginUser(req,res)
})

module.exports = router;