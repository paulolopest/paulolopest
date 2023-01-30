import React from 'react'

const Product = ({data}) => {
  return (
    <div style={{border: "1px solid black", width: "300px", height: "300px", display:"flex", flexDirection: "column", alignContent: "center", alignItems: "center"}}>
      <h2>{data.nome}</h2>
      <p>R$ {data.preco}</p>
      <img src={data.fotos[0].src} alt={data.fotos[0].titulo} style={{ width: "150px", height: "150px"}}></img>
    </div>
  )
}

export default Product