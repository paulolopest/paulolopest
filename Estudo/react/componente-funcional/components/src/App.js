import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import ProductsPage from './components/products/ProductsPage'


const App = () => {
    const {pathname} = window.location

    let Component
    if(pathname === "/products") {
        Component = ProductsPage
    } else {
        Component = Home
    }
  return (
    <>
        <Header/>
        <Component/>
    </>
  )
}

export default App