import React from 'react'
import { GlobalContext } from './GlobalContext'

const Product = () => {
    const { data } = React.useContext(GlobalContext)

    if (data === null) return null
    return (
        <div>
            Product: {data.map((product) => {
                return (
                    <ul>
                        <li>{product.nome}</li>
                    </ul>
                )
            })}
        </div>
    )
}

export default Product