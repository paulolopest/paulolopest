import React from 'react'

// const App = () => {
//   const [display, setDisplay] = React.useState(true)
//   const [comments, setComments] = React.useState([])
//   const [input, setInput] = React.useState("")
//   const inputElement = React.useRef()

//   const onClickDark = () => {
//     setDisplay(!display)
//   }

//   const handleClick = () => {
//     setComments([...comments, input])
//     setInput("")
//     inputElement.current.focus()
//   }

//   return (
//     <div style={{ background: display ? "white" : "#302d2e", width: "100vw", height: "100vh", color: display ? "black" : "white" }}>
//       <button onClick={onClickDark}>Dark</button>

//       <ul>
//         {comments.map((comment) => (
//           <li>{comment}</li>
//         ))}  
//       </ul>

//       <input
//         type="text"
//         ref={inputElement}
//         value={input}
//         onChange={(event) => setInput(event.target.value)}
//       />

//       <button onClick={handleClick}>Send</button>
//     </div>
//   )
// }

// export default App


const App = () => {
  const [cart, setCart] = React.useState(0)
  const [notification, setNotification] = React.useState(null)
  const timeOutRef = React.useRef()

  const handleClick = () => {
    setCart(cart + 1)
    setNotification("Item successfully added")

    clearTimeout(timeOutRef.current)
    timeOutRef.current = setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  return (
    <div>
      <p>{notification}</p>
      <button onClick={handleClick}>{cart}</button>
    </div>
  )
}

export default App