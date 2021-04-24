import React from 'react'

export default function Input({name,type,onChange , group,value}) {
    return (
        <div>
            <label>{name}</label>
            <input type={type} name={group}value={value} onChange={onChange}></input>
        </div>
    )
}
