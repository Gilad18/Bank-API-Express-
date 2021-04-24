import React from 'react'
import {Link} from 'react-router-dom'
import './utilities.css'

export default function Table({data}) {
    return (
        <div>
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
                <tbody>
                    {data.map((item,index) => {
                        return <tr key={index}>
                             <td>{item.passport}</td>
                             <td>/NAME/</td>
                             <td>{item.credit}</td>
                             <td>{item.balance}</td>
                             <td><Link to={`/account/${item.passport}`}>MORE</Link></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
