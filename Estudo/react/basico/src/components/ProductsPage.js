import React from 'react'
import ProductCard from './ProductCard';

const ProductsPage = () => {
    const products = [
        { name: 'Notebook', propriety: ['16gb ram', '512gb'] },
        { name: 'Smartphone', propriety: ['2gb ram', '128gb'] },
        ];

    return (
        <div>
            {products.map((product) => {
                return (
                    <ProductCard key={product.name} {...product}/>
                )
            })}
        </div>
    )
}

export default ProductsPage