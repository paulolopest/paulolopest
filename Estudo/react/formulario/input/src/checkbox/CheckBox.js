import React from 'react'

const CheckBox = () => {
    const [colors, setColors] = React.useState(["red"])

    const handleChange = ({ target }) => {
        if (target.checked) {
            setColors([...colors, target.value])
        } else {
            setColors(colors.filter((color) => color !== target.value))
        }
        console.log(colors)
    }

    return (
        <form>
            <label>
                Blue
                <input
                    type="checkbox"
                    value="blue"
                    checked={colors.includes("blue")}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                />
            </label>
            <label>
                Red
                <input
                    type="checkbox"
                    value="red"
                    checked={colors.includes("red")}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                />
            </label>
        </form>
    )
}

export default CheckBox