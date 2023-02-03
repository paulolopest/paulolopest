import React from 'react'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({ children }) => {
    const [data, setData] = React.useState(null)
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        fetch("https://ranekapi.origamid.dev/json/api/produto")
            .then(res => res.json())
            .then(json => setData(json))

        setShow(false)
    }, [show])

    const cleanData = () => {
        setData(null)
    }

    const showData = () => {
        setShow(true)
    }

    return (
        <GlobalContext.Provider value={{ data, cleanData, showData }}>{children}</GlobalContext.Provider>
    )
}

