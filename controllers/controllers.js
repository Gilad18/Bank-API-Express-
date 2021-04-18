const dataJSON = require('../accounts.json')
const fs = require('fs');


const getAccountByPassport = (req) => {
    return dataJSON.accounts.filter(item => item.passport === req)
}

const getClientsByAmount = (req,res) => {
    const selected = dataJSON.accounts.filter(item => item.cash >= parseInt(req.params.amount))
    if(selected.length>0) {
        return res.status(200).json(selected)
    } else {res.status(200).json({ error: 'There are no clients with a balance of the requested amount' })} 
}

const addNewAccount = (req, res) => {
    let checkIfExsit = getAccountByPassport(req.params.passport)
        if(!checkIfExsit[0]) {
            let tempJSON = dataJSON
            tempJSON.accounts.push({passport: req.params.passport,cash: 0,credit: 0})
            fs.writeFileSync('./accounts.json', JSON.stringify(tempJSON))
            return res.status(200).json({ success: 'new account was successfully created' })
        }
     else {res.status(200).json({ error: 'Client already exist' })}
}

const deposit = (req, res) => {
        let selected = getAccountByPassport(req.params.passport);
    if (selected[0]) {
        selected.map(item => item.cash += parseInt(req.params.amount));
        fs.writeFileSync('./accounts.json', JSON.stringify(dataJSON));
        return res.status(200).json({ success: 'Deposit was succesfully made' })
    }
    else { res.status(200).json({ error: 'Account does not exsist' }) }
}

const updateCredit = (req, res) => {
    let selected = getAccountByPassport(req.params.passport);
    if (selected[0]) {
        selected.map(item => item.credit = parseInt(req.params.amount));
        fs.writeFileSync('./accounts.json', JSON.stringify(dataJSON));
        return res.status(200).json({ success: 'Credit was succesfully updated' })
    }
    else { res.status(200).json({ error: 'Account does not exsist' }) }
}

const withdrawl = (req, res) => {
    let selected = getAccountByPassport(req.params.passport);
    if (selected[0]) {
        if (req.params.amount <= selected[0].cash + selected[0].credit) {
            selected.map(item => item.cash -= req.params.amount)
            fs.writeFileSync('./accounts.json', JSON.stringify(dataJSON));
            return res.status(200).json({ success: 'Withdrawal was successfuly made' })
        } else { res.status(200).json({ error: 'client doesnt have sufficent funds for this action' }) }
    }
    else { res.status(200).json({ error: 'Account does not exsist' }) }
}

const transfer = (req,res) => {
    let sender = getAccountByPassport(req.params.passport1)
    let reciever = getAccountByPassport(req.params.passport2)
    if (sender[0] && reciever[0]) {
        if (req.params.amount <= sender[0].cash + sender[0].credit) {
            sender.map(item => item.cash -= parseInt(req.params.amount))
            reciever.map(item => item.cash += parseInt(req.params.amount))
            fs.writeFileSync('./accounts.json', JSON.stringify(dataJSON));
            return res.status(200).json({ success: 'Transfer was successfuly made' })
        } else { res.status(200).json({ error: 'client doesnt have sufficent funds for this action' }) }
    }
    else { res.status(200).json({ error: 'One or Two of the accounts not exsist' }) }
}

module.exports = {
    getAccountByPassport,
    addNewAccount,
    deposit,
    updateCredit,
    withdrawl,
    transfer,
    getClientsByAmount
}