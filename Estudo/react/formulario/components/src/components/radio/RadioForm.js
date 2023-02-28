import React from 'react'

const RadioForm = ({ options, value, setValue, ...props }) => {
    return (
        <>
            {options.map((option, index) => (
                <label style={{ width: "20px", display: "flex" }} key={index}>
                    {option}
                    <input
                        type="radio"
                        value={option}
                        checked={value === option}
                        onChange={({ target }) => setValue(target.value)}
                    />
                </label>
            ))}
        </>
    )
}

export default RadioForm