import React from 'react'

const Radio = () => {

    const [product, setProduct] = React.useState("")
    const [color, setColor] = React.useState("")

    return (
        <form>
            <h2>Colors:</h2>
            <label>
                <input
                    type="radio"
                    onChange={({ target }) => setColor(target.value)}
                    checked={color === "Red"}
                    value="Red"
                />
                Red
            </label>
            <label>
                <input
                    type="radio"
                    onChange={({ target }) => setColor(target.value)}
                    checked={color === "Blue"}
                    value="Blue"
                />
                Blue
            </label>

            <h2>Products:</h2>
            <label>
                <input
                    type="radio"
                    onChange={({ target }) => setProduct(target.value)}
                    checked={product === "Smartphone"}
                    value="Smartphone"
                />
                Smartphone
            </label>
            <label>
                <input
                    type="radio"
                    onChange={({ target }) => setProduct(target.value)}
                    checked={product === "Notebook"}
                    value="Notebook"
                />
                Notebook
            </label>
        </form>
    )
}

export default Radio