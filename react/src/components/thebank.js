import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Thebank() {
    const {account , setaccount} = useState([])

    useEffect(() => {
        const search = async () => {
         const getData = await axios.get('http://bank-gilad.herokuapp.com/api/')
         setaccount(getData);
         console.log(getData)
        }
        search();
    }, [account])

    return (
        <div>
            here the users will be
            {account}
        </div>
    )
}
