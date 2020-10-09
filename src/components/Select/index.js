import React from 'react'
import './Select.css'

function Select({value,setCurrency,currencies,label}) {

    return (
        // <select value={value} onChange={e => setCurrency(e.target.value)}>
        //     { currencies.map(curr => <option key={curr} value={curr}>{curr}</option>) }
        // </select>
        <>
            <span>{label}</span>
            <select className='custom-select' value={value} onChange={e => setCurrency(e.target.value)}>
                { currencies.map(curr => <option key={curr} value={curr}>{curr}</option>) }
            </select>
        </>
    )
}

export default Select
