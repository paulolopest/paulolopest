import React from "react";
import axios from "axios";
import Product from "./components/exercicio/Produto";

// function App() {

//   const [count, setCount] = React.useState(0)

//   React.useEffect(() => {
//     console.log("Esta fora")
//   })

//   React.useEffect(() => {
//     document.title = `Count ${count}` 
//   })

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>{count}</button>
//     </div>
//   )
// }

// export default App;


// const App = () => {

//   const [count, setCount] = React.useState(0)
//   const [data, setData] = React.useState(null)

//   React.useEffect(() => {
//     fetch('https://ranekapi.origamid.dev/json/api/produto/notebook')
//     .then((response) => response.json())
//     .then((json) => setData(json));
//   }, [count])

//   return (
//     <div>
//         <button onClick={() => setCount(count + 1)}>{count}</button>
//         {data && (
//           <div>
//             <h1>{data.nome}</h1>
//             <p> R$ {data.preco}</p>

//             <p>{data.preco * count}</p>
//           </div>
//         )}
//     </div>
//   )
// }

// export default App

const App = () => {

  const [product, setProduct] = React.useState(null)

  React.useEffect(() => {
    if (product != null) window.localStorage.setItem("product", product)
  }, [product])

  React.useEffect(() => {
    const localProduct = window.localStorage.getItem("product")
    if (localProduct) setProduct(localProduct)
  }, [])



  const updateProduct = (event) => {
    setProduct(event.target.innerText)
  }

  console.log(product)

  return (
    <div>
      <h1>Preference: {product}</h1>
      {product && (
        <Product product={product} />
      )}
      <button onClick={updateProduct}>Smartphone</button>
      <button onClick={updateProduct}>Notebook</button>
    </div>
  )
}

export default App