import React from 'react'

export default function Input({name,type,onChange}) {
    return (
        <div>
            <label>{name}</label>
            <input type={type} onChange={onChange}></input>
        </div>
    )
}
