import React from 'react'
import CleanButton from './components/CleanButton'
import { GlobalStorage } from './components/GlobalContext'
import Product from './components/Product'
import ShowDataButton from "./components/ShowDataButton"

const App = () => {
  return (
    <GlobalStorage>
      <Product />
      <CleanButton />
      <ShowDataButton />
    </GlobalStorage>
  )
}

export default App