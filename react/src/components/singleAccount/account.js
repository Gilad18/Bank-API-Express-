import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Button from '../untilities/Button'
import Input from '../untilities/Input'

export default function Account() {
    const {passport} = useParams()
    const [account, setAccount] = useState({})

    
    useEffect(() => {
        const search = async () => {
            const getData = await axios.get(`http://bank-gilad.herokuapp.com/api/accounts/${passport}`);
            setAccount(getData.data)
    }
    search();
    },[])

    return (
        <div>
           <h2>Account :{account.passport}</h2>
           <h5>Line Of Credit :{account.credit}</h5>
           <h1>Balance :{account.balance}</h1>
        </div>
    )
}
