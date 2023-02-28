import React from 'react'
import SelectForm from './SelectForm'

const SelectIndex = () => {
    const [product, setProduct] = React.useState("")

    return (
        <div>
            <SelectForm
                value={product}
                options={["Tablet", "Smartphone", "Notebook", "Speaker"]}
                setValue={setProduct}
            />

            {product}
        </div>
    )
}

export default SelectIndex