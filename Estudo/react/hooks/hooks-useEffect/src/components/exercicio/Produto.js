import React from 'react'

const Product = ({ product }) => {

  const [data, setData] = React.useState(null)

  const url = "https://ranekapi.origamid.dev/json/api/produto"

  React.useEffect(() => {
    if (product !== null) {
      fetch(`${url}/${product}`)
        .then((res) => res.json())
        .then((json) => setData(json))
        .then(console.log(data))
    }

  }, [product])

  if (data === null) {
    return null
  } else {
    return (
      <div>
        <h1>{data.nome}</h1>
        <p>{data.preco}</p>
      </div>
    )
  }
}

export default Product