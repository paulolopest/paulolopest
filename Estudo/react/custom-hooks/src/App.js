import React from 'react'
import useFetch from './hooks/useFetch'
import useLocalStorage from './hooks/useLocalStorage'

const App = () => {
  const { data, error, loading, request } = useFetch()

  React.useEffect(() => {
    request("https://ranekapi.origamid.dev/json/api/produto/")
  }, [request])

  console.log(data)

  if (error) return <p>Error</p>
  if (loading) return <p>loading</p>
  if (data) {
    return (
      <div>
        <ul>
          {data.map((product) => {
            return (
              <div style={{ border: "1px solid black", width: "150px", margin: "5px" }}>
                <p>{product.nome}</p>
                <p>R$ {product.preco}</p>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
  else return null
}


export default App