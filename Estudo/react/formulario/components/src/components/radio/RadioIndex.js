import React from 'react'
import RadioForm from './RadioForm'

const RadioIndex = () => {

    const [color, setColor] = React.useState("")
    const [product, setProduct] = React.useState("")

    return (
        <form>
            <h2>Colors:</h2>
            <RadioForm
                options={["Blue", "Red"]}
                value={color}
                setValue={setColor}
            />

            <h2>Products:</h2>
            <RadioForm
                options={["Smartphone", "Notebook", "Tablet", "Speaker"]}
                value={product}
                setValue={setProduct}
            />
        </form>
    )
}

export default RadioIndex