import React from 'react'

const ProductsCard = (props) => {
  return (
    <div style={{display: "flex", flexDirection: "column", alignContent: "center", width: "10%",border: "1px solid black", margin: "5px", padding: "1rem 0"}}>
        <h2>{props.name}</h2>
        <ul>
            {props.propriety.map((item) => {
                return <li id ={item}>{item}</li>
            })}
        </ul>
    </div>
  )
}

export default ProductsCard