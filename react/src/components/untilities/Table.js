import React from 'react'
import {Link} from 'react-router-dom'
import './utilities.css'

export default function Table({data}) {
    return (
        <React.Fragment>
         <tbody  style={{width:'100%'}}>
                    {data.map((item,index) => {
                        return <tr key={index}>
                             <td>{item.passport}</td>
                             <td>/NAME/</td>
                             <td>{item.credit}</td>
                             <td style={item.balance>=0?{color:'green'}:{color:'red'}}>{item.balance}</td>
                             <td><Link to={`/account/${item.passport}`}>MORE</Link></td>
                        </tr>
                    })}
                </tbody>
                </React.Fragment>
    )
}
