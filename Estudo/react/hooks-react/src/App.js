import React from "react";
import ButtonModal from "./components/ButtonModal";
import Modal from "./components/Modal";


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


const App = () => {
  const [modal, setModal] = React.useState(false)

  console.log(modal)

  return (
    <div>
      <Modal modal={modal} setModal={setModal}/>
      <ButtonModal setModal={setModal}/>
    </div>
  )
}

export default App