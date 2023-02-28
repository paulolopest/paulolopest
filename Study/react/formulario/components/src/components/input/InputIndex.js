import React from 'react'
import InputForm from './components/InputForm'

const InputIndex = () => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")

    return (
        <form>
            <InputForm
                label="Name"
                id="name"
                value={name}
                setValue={setName}
            />
            <InputForm
                label="Email"
                id="email"
                value={email}
                setValue={setEmail}
                required
            />
            <button>Send</button>
        </form>
    )
}

export default InputIndex