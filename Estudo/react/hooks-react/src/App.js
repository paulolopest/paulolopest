import React from "react";
import ButtonModal from "./components/modal-ex/ButtonModal";
import Modal from "./components/modal-ex/Modal";
import Product from "./components/exercicio/Produto";


// const App = () => {
//   const [value, setValue] = React.useState(0);

//   const sumValue = () => {
//     setValue(value + 1);
//   };

//   const decreaseValue = () => {
//     setValue(value - 1);
//   };

//   return (
//     <div>
//       <button onClick={sumValue}>+1</button>
//       <button onClick={decreaseValue}>-1</button>
//       <h1>{value}</h1>
//     </div>
//   );
// };

// export default App;


// const App = () => {
//   const [modal, setModal] = React.useState(false)

//   console.log(modal)

//   return (
//     <div>
//       <Modal modal={modal} setModal={setModal}/>
//       <ButtonModal setModal={setModal}/>
//     </div>
//   )
// }

// export default App


const App = () => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(null)

  const URL = `https://ranekapi.origamid.dev/json/api/produto`

  async function handleClick (event) {
    setLoading(true)

    const response = await fetch(`${URL}/${event.target.innerText}`)

    const jsonR = await response.json()

    setData(jsonR)
    setLoading(false)
  }

  return (
    <div>
      <div>
        <button style={{margin: "2%"}} onClick={handleClick} >Notebook</button>
        <button style={{margin: "2%"}} onClick={handleClick} >Smartphone</button>
        <button style={{margin: "2%"}} onClick={handleClick} >Tablet</button>
      </div>
      {loading ? <p>loading...</p> : null}
      {data && !loading ? <Product data = {data}/> : <p>Any product</p>}
    </div>
  )
}

export default App