import React from 'react'

const SelectForm = ({ options, setValue, value, ...props }) => {
    return (
        <select
            value={value}
            onChange={({ target }) => setValue(target.value)}
        >
            <option
                value=""
                disabled>Select
            </option>

            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    )
}

export default SelectForm