import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../untilities/Button'
import Table from '../untilities/Table'
import Input from '../untilities/Input'
import './theBank.css'

export default function Thebank() {

    const [data, setData] = useState([])
    const [newPassport, setNewPassport] = useState('')
    const [newName, setNewName] = useState('')
    const [message, setMessage] = useState('')
    const [search , setSearch] = useState('')
    const [filter , setFilter] = useState(null)

    useEffect(() => {
        const search = async () => {
            const getData = await axios.get('http://bank-gilad.herokuapp.com/api/');
            setData(getData.data)
        }
        search();
    }, [data])

    const createNewAccount = async () => {
        const newAccount = await axios.post(`http://bank-gilad.herokuapp.com/api/${newPassport}/${newName}`)
        const kind = Object.keys(newAccount.data)
        const text = Object.values(newAccount.data)
        setMessage(`${kind[0].toUpperCase()}!, ${text[0]}`)
        setTimeout(() => {
            setMessage('')
        }, 3500);      
    }

    return (
        <div>
            <div className="upperPage">
                <h1 style={{ textAlign: 'center' }}>Welcome, Mr. Manager</h1>
                <div className="newUserSection">
                    <h3>Create New Account:</h3>
                    <Input name="Passport:" type="text" onChange={(e) => setNewPassport(e.target.value)} />
                    <Input name="Name:" type="text" onChange={(e) => setNewName(e.target.value)} />
                    <Button name="Add New Account" onClick={createNewAccount} />
                </div>
                <p className="message">{message}</p>
            </div>
            <div className="searchBAr">
            <Input type="text" name="Search By Name or Passport :" onChange={(e)=> setSearch(e.target.value)}/>
            </div>
            <div className="filterBar">
            <Input type="number" name="Filter By Amount :" onChange={(e)=> setFilter(e.target.value)}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Passport</th>
                        <th>Name</th>
                        <th>Credit Line</th>
                        <th>Balance</th>
                        <th>More</th>
                    </tr>
                </thead>
                <Table data={data.filter(account => {
                    return account.name.toLowerCase().includes(search.toLowerCase()) ||
                            account.passport.toLowerCase().includes(search.toLowerCase())
                }).filter(user => {
                    if(filter) {
                        return user.balance >= filter
                    }
                    else {
                        return user.isActive === true
                    }
                })} />
            </table>
            {data.length === 0 &&
                <h2 style={{ textAlign: 'center' }}>There are no Accounts Avalable to show</h2>}
        </div>
    )
}
