import React from 'react'
import { GlobalContext } from './GlobalContext'

const CleanButton = () => {

    const { cleanData } = React.useContext(GlobalContext)

    return (
        <button onClick={cleanData}>Clean</button>
    )
}

export default CleanButton