import React from 'react'
import InputForm from "./components/input/InputForm"

const App = () => {

  const [cep, setCep] = React.useState("")
  const [error, setError] = React.useState(null)

  const validateCep = (value) => {
    if (value.length <= 0) {
      setError("Enter a cep")
      return false
    } else if (!/^\d{5}-?\d{3}$/.test(value)) {
      setError("Enter a valid cep")
      return false
    } else {
      setError(null)
      return true
    }
  }

  const handleBlur = ({ target }) => {
    validateCep(target.value)
  }

  const handleChange = ({ target }) => {
    if (error) validateCep(target.value)
    setCep(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateCep(cep)) {
      console.log("Sended")
    } else {
      console.log("Not sended")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        value={cep}
        onChange={handleChange}
        type="text"
        label="CEP"
        id="CEP"
        placeholder="0000-000"
        onBlur={handleBlur}
      />
      {error && <p>{error}</p>}
      <button>Send</button>
    </form>
  )
}

export default App