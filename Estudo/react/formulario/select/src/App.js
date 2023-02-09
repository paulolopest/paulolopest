import React from 'react'

const App = () => {
  const [select, setSelect] = React.useState("")

  return (
    <form>
      <select id="products" value={select} onChange={({ target }) => setSelect(target.value)}>
        <option disabled value="">Select</option>
        <option value={"Notebook"}>Notebook</option>
        <option value={"Smartphone"}>Smartphone</option>
        <option value={"Tablet"}>Tablet</option>
      </select>
      <br />
      {select}
    </form>
  )
}

export default App