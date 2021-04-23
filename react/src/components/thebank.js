import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Thebank() {
      
        const {data,setData} = useState([])

        useEffect(() => {
            const search = async () => {
                const getData = await axios.get('http://bank-gilad.herokuapp.com/api/');
                console.log(getData)
        }
        search()
        },[])
       
    return (
        <div>
            here the users will be
        </div>
    )
}
