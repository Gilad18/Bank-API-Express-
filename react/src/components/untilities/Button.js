import React from 'react'

export default function Button({name,onClick}) {
    return (
        <div>
            <button onClick={onClick}>{name}</button>
        </div>
    )
}
