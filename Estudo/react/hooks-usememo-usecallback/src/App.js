import React from 'react'

// function operation() {
//   let c
//   for (let i = 0; i < 100000000; i++) {
//     c = i + i / 10;
//   }

//   return c
// }

// const App = () => {

//   const [count, setCount] = React.useState(0)

//   const t1 = performance.now()
//   const value = React.useMemo(() => operation(), [])

//   console.log(performance.now() - t1)

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>{count}</button>
//     </div>
//   )
// }

// export default App


// Use Memo ------Use Memo ------Use Memo ------Use Memo ------Use Memo ------Use Memo ------Use Memo ------Use Memo ------

const App = () => {

  const [count, setCount] = React.useState(0)
  const [count2, setCount2] = React.useState(0)

  const handleClick = React.useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  const handleClick2 = () => {
    setCount2(count2 + 1)
  }


  return (
    < div >
      <button onClick={handleClick}>{count}</button>
      <button onClick={handleClick2}>Count2: {count2}</button>
    </div >
  )
}

export default App