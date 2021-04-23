import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Thebank() {
    const {account , setaccount} = useState([])

    useEffect(() => {
        const search = async () => {
         const getData = await axios.get('mongodb+srv://gilad18587:MapileyEgoz85@mybankdatabase.418pd.mongodb.net/test')
         setaccount(getData);
         console.log(getData)
        }
        search();
    }, [])

    return (
        <div>
            here the users will be
        </div>
    )
}
