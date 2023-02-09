import React from 'react'

const CheckboxForm = ({ options, value, setValue }) => {

    const handleChange = ({ target }) => {
        if (target.checked) {
            setValue([...value, target.value])
        } else {
            setValue(value.filter((item) => item !== target.value))
        }
    }

    return (
        <div>
            {options.map((option, index) => (
                <label style={{ width: "20px", display: "flex" }} key={index}>
                    {option}
                    <input
                        value={option}
                        type="checkbox"
                        checked={value.includes(option)}
                        onChange={handleChange}
                    />
                </label>
            ))
            }
        </div >
    )
}

export default CheckboxForm