import React from 'react'
import './TableData.css'

function TableData({countries}) {
    return (
        <div className="tabledata">
            {countries.map(country => (
                <tr className="tabledata__row">
                <td>{country.name}</td>
                <td>{country.totalCases}</td>
            </tr>
            ))}
        </div>
    )
}

export default TableData
