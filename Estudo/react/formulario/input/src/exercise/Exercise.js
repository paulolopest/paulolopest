import React from 'react'
import useFetch from '../hooks/useFetch'

const Exercise = () => {
    const [form, setForm] = React.useState({
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
    })

    const [response, setResponse] = React.useState(null)

    const { data, loading, error, request } = useFetch()

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault()

        request("https://ranekapi.origamid.dev/json/api/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then(({ response }) => {
            setResponse(response)
        })

    }, [form, request])

    const handleChange = ({ target }) => {
        const { id, value } = target
        setForm({ ...form, [id]: value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='nome'>nome</label>
            <input
                type="text"
                id="nome"
                value={form.nome}
                onChange={handleChange}
            ></input>

            <label htmlFor='email'>Email</label>
            <input
                type="text"
                id="email"
                value={form.email}
                onChange={handleChange}
            ></input>

            <label htmlFor='senha'>senha</label>
            <input
                type="text"
                id="senha"
                value={form.senha}
                onChange={handleChange}
            ></input>

            <label htmlFor='cep'>Cep</label>
            <input
                type="text"
                id="cep"
                value={form.cep}
                onChange={handleChange}
            ></input>

            <label htmlFor='rua'>rua</label>
            <input
                type="text"
                id="rua"
                value={form.rua}
                onChange={handleChange}
            ></input>

            <label htmlFor='numero'>numero</label>
            <input
                type="text"
                id="numero"
                value={form.numero}
                onChange={handleChange}
            ></input>

            <label htmlFor='bairro'>bairro</label>
            <input
                type="text"
                id="bairro"
                value={form.bairro}
                onChange={handleChange}
            ></input>

            <label htmlFor='cidade'>cidade</label>
            <input
                type="text"
                id="cidade"
                value={form.cidade}
                onChange={handleChange}
            ></input>

            <label htmlFor='estado'>estado</label>
            <input
                type="text"
                id="estado"
                value={form.estado}
                onChange={handleChange}
            ></input>

            <button>Send</button>

            {response && response.ok && <p>Sended Form</p>}
            {error && error && <p>{error}</p>}
        </form>
    )
}

export default Exercise