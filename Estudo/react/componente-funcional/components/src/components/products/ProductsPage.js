import React from 'react'
import ProductsCard from './ProductsCard'

const ProductsPage = () => {
    const products = [
        { name: 'Notebook', propriety: ['16gb ram', '512gb'] },
        { name: 'Smartphone', propriety: ['2gb ram', '128gb'] },
    ];

    return (
        <div>
            {products.map((item) => {
                return (
                    <ProductsCard name = {item.name} propriety = {item.propriety}/>
                )
            })}
        </div>
    )
}

export default ProductsPage