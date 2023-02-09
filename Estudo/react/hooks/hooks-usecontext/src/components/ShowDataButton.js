import React from 'react'
import { GlobalContext } from './GlobalContext'

const ShowDataButton = () => {

    const { showData } = React.useContext(GlobalContext)

    return (
        <button onClick={showData}>Show</button>
    )
}

export default ShowDataButton