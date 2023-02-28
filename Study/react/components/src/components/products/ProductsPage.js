import React from 'react'
import ProductsCard from './ProductsCard'
import Title from '../Title';

const ProductsPage = () => {
    const products = [
        { name: 'Notebook', propriety: ['16gb ram', '512gb'] },
        { name: 'Smartphone', propriety: ['2gb ram', '128gb'] },
    ];

    return (
        <div>
            <Title name="Products"/>
            {products.map((item) => {
                return (
                    <ProductsCard name = {item.name} propriety = {item.propriety}/>
                )
            })}
        </div>
    )
}

export default ProductsPage