import React from 'react'

const ProductCard = ({name, propriety}) => {
  return (
        <div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>
            <p>{name}</p>
            <ul>
              {propriety.map((item) => {
                return (
                  <li key={item}>{item}</li>
                )
              })}
            </ul>
        </div>
  )
}

export default ProductCard
