import React from "react"
import  Header  from "./components/Header"
import  Home  from "./components/Home"
import  Footer  from "./components/Footer"
import  ProductsPage  from "./components/ProductsPage"

// export const App = () => {

//     const luana = {
//         name: "Luana",
//         age: 29,
//         bought: [
//             {nome: "Notebook", preco: "R$ 2500"},
//             {nome: "Geladeira", preco: "R$ 1000"},
//             {nome: "Celular", preco: "R$ 4000"},
//             {nome: "TV", preco: "R$ 2500"},
//         ],
//         active: true
//     }

//     const mario = {
//         name: "Mario",
//         age: 31,
//         bought: [
//             {nome: "PC", preco: "R$ 2500"},
//             {nome: "Frigobar", preco: "R$ 1000"},
//             {nome: "Telefone", preco: "R$ 500"},
//             {nome: "Projetor", preco: "R$ 2500"},
//         ],
//         active: false
//     }

//     const data = mario

//     const totalValue = data.bought.map((item) => {
//         return Number(item.preco.replace("R$ ", ""))
//     }).reduce((a, b) => a + b)


//     return (
//         <div className="">
//             <p>Name: <strong>{data.name}</strong></p>
//             <p>Age: {data.age}</p>
//             <p>Situation: <span style={{color: data.active ? "green" : "red"}}>{data.active ? "Active" : "Inactive"}</span></p>
//             <p>Total value: R$ {totalValue}</p>
//             {totalValue >= 10000 ? "You are expend too much money" : ""}
//         </div>
//     )
// }

// export const App = () => {
//     const books = [
//         { name: "Game of Thrones", year: 1996},
//         { name: "Clash of Kingdoms", year: 1998},
//         { name: "Storm of swords", year: 2000},
//     ]

//     return (
//         <>
//             {books
//             .filter(({year}) => year >=2000)
//             .map(({name, year}) => (
//                 <li key = {name}>
//                     {name}, {year}
//                 </li>
//             ))}
//         </>
//     )
// }

// export const App = () => {
//     const products = [
//         {
//             id: 1,
//             name: 'Smartphone',
//             price: 'R$ 2000',
//             colors: ['#29d8d5', '#252a34', '#fc3766'],
//         },
//         {
//             id: 2,
//             name: 'Notebook',
//             price: 'R$ 3000',
//             colors: ['#ffd045', '#d4394b', '#f37c59'],
//         },
//         {
//             id: 3,
//             name: 'Tablet',
//             price: 'R$ 1500',
//             colors: ['#365069', '#47c1c8', '#f95786'],
//         },
//     ];
//     return (
//         <div>
//             {products
//                 .map(({id, name, price, colors}) => (
//                     <div>
//                         <h1>{name}</h1>
//                         <p>{price}</p>
//                         <div>{colors.map((color) => (
//                             <li style={{backgroundColor: color, color: "white"}}>{color}</li>
//                         ))}</div>
//                     </div>
//             ))}
//         </div>
//     )
// }

export const App = () => {

    const {pathname} = window.location

    let Component

    if(pathname === "/products") {
        Component = ProductsPage
    } else {
        Component = Home
    }

    console.log(pathname)
    return (
        <div>
            <Header/>
            <Component/>
            <Footer/>
        </div>
    )
}