import React from 'react'

export default function TransacionTAble({data}) {
    return (
              <React.Fragment>
                  {data.length>0 && 
         <tbody  style={{width:'100%'}}>
                    {data.map((item,index) => {
                        return <tr style={item.action==='Credit'?{color:'green'}:{color:'red'}} key={index}>
                             <td>{item._id}</td>
                             <td>{item.action}</td>
                             <td>{item.amount}</td>
                             <td>{item.dateAdd}</td>
                             <td>/Comments/</td>
                        </tr>
                    })}
                </tbody>
                }
                </React.Fragment>
    )
}




