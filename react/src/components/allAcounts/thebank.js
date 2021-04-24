import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../untilities/Button'
import Table from '../untilities/Table'
import Input from '../untilities/Input'
import './theBank.css'

export default function Thebank() {
      
        const [data,setData] = useState([])
        const [newPassport, setNewPassport] = useState('')
        
        useEffect(() => {
            const search = async () => {
                const getData = await axios.get('http://bank-gilad.herokuapp.com/api/');
                setData(getData.data)
        }
        search();
        },[data])

        const createNewAccount = async () => {
            console.log(newPassport);
            const newAccount=  await axios.post(`http://bank-gilad.herokuapp.com/api/${newPassport}`);
            console.log(newAccount)
        }
       
    return (
        <div>
            <div className="upperPage">
            <h1>Welcome, Mr. Manager</h1>
            <Input name="Passport:" type="text" onChange={(e) => setNewPassport(e.target.value)}/>
            <Button name="Add New Account" onClick={createNewAccount}/>
            </div>
            <Table data={data}/>
        </div>
    )
}
