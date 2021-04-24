import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Button from '../untilities/Button'
import Input from '../untilities/Input'
import Table from './TransacionTAble'
import './singleAccount.css'

export default function Account() {
    const {passport} = useParams()
    const [account, setAccount] = useState({})
    const [transaction , setTransactions] = useState([])
    const [action , setAction] = useState('')
    const [amount , setAmount] = useState('')
    const [message , setMessage] = useState('')

    
    useEffect(() => {
        const search = async () => {
            const getData = await axios.get(`http://bank-gilad.herokuapp.com/api/accounts/${passport}`);
            setAccount(getData.data)
            const getTrans = await axios.get(`http://bank-gilad.herokuapp.com/api/accounts/${passport}/transactions`)
            setTransactions(getTrans.data)
    }
    search();
    },[])

    const applyAction = async () => {
        console.log(action)
        console.log(amount)
        const confirm = await axios({
            method: 'put',
            url: `http://bank-gilad.herokuapp.com/api/accounts/${passport}/${action}`,
            data: {
                amount : amount
            }
        })
        const kind = Object.keys(confirm.data)
        const text = Object.values(confirm.data)
        setMessage(`${kind[0].toUpperCase()}!, ${text[0]}`)
    }

    return (
        <div>
            <div className="upperPageSingle">
                <div className="accountInfo">
            <Link to={'/'}>Back</Link>
           <h2>Account :{account.passport}</h2>
           <h5>Line Of Credit :{account.credit}</h5>
           <h1>Balance :{account.balance}</h1>
           </div>
           <div className="accountActions">
           <div className="actionSection">
           <Input type="radio" group="Actions" name="Deposit" value="deposit" onChange={(e) => setAction(e.target.value)} />
           <Input type="radio" group="Actions" name="Withdraw" value="debit" onChange={(e) => setAction(e.target.value)} />
           <Input type="radio" group="Actions" name="Update Credit" value="credit" onChange={(e) => setAction(e.target.value)} />
           <Input type="number" name="Amount:" onChange={(e) => setAmount(e.target.value)}/>
           <Button name="Apply" onClick={applyAction}/>
           </div>
           <p style={{textAlign:'center'}}>{message}</p>
           </div>
           </div>
           <table>
                <thead>
                    <tr>
                        <th>Transacion ID</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Comments</th>
                    </tr>
                </thead>
            <Table data={transaction}/>
            </table>
        </div>
    )
}
