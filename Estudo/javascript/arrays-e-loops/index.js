let videoGames = ["PS5", "XBOX", "Nintendo Switch"]

videoGames.pop()
videoGames.push("PS2")
videoGames.length

//---------

for (let n = 0; n <= 20; n++) {
    console.log(n)
}

let n = 0
while (n <= 10) {
    console.log(n)
    n++
}

for (let n = 0; n < videoGames.length; n++) {
    console.log(videoGames[n])
}

//---------

let fruits = ["Pineapple", "Apple", "Blueberry", "Strawberry"]

fruits.forEach((fruit, i) => {
    console.log(fruit, i)
})

//---------

let brasilWorldCup = [1959, 1962, 1970, 1994, 2002]

for (let i = 0; i < brasilWorldCup.length; i++) {
    console.log(`The Brazil was world champion in ${brasilWorldCup[i]}`)
}

//---------

let frutas = ["Banana", "Maçã", "Pera", "Uva", "Melancia"]

for (let i = 0; i <= frutas.length; i++) {
    if (frutas[i] === "Pera") {
        console.log(frutas[i])
        break
    }
}

const test = frutas.length
console.log(test)

const bestFruit = frutas[test - 1]
console.log(bestFruit)