
import React from 'react'

const coresArray = ['azul', 'roxo', 'laranja', 'verde', 'vermelho', 'cinza'];

const Exercise = () => {
    const [cores, setCores] = React.useState([])

    const handleChange = ({ target }) => {
        if (target.checked) {
            setCores([...cores, target.value])
        } else {
            setCores(cores.filter((cor) => cor !== target.value))
        }
    }

    const handleCheck = (cor) => {
        return cores.includes(cor)
    }

    return (
        <form>
            {coresArray.map((cor, index) => {
                return (
                    <label key={index}>
                        {cor}
                        <input
                            type="checkbox"
                            value={cor}
                            checked={handleCheck(cor)}
                            onChange={handleChange}
                            style={{ width: "auto" }}
                        />
                    </label>
                )
            })}
        </form>
    )
}

export default Exercise