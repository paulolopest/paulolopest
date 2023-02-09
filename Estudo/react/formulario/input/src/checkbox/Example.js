import React from 'react'

const Example = () => {
    const [terms, setTerms] = React.useState(false)

    return (
        <form style={{ display: "flex" }}>
            <label>
                Accept the terms
                <input
                    type="checkbox"
                    value="Terms"
                    checked={terms}
                    onChange={({ target }) => setTerms(target.checked)}
                />
            </label>
        </form>
    )
}

export default Example