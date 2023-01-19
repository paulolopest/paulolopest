var person = {
    name: "Paulo",
    age: 20,
    itsFrom: "RJ",

    showName: function (){
        return console.log(this.name)   
    }
}

console.log(person.showName)

//------------

var car = {
    price: 1000,
    doors: 4,
    brand: "Audi"
}

car.price = 3000

console.log(car.price)

//------------

var dog = {
    breed: "labrador",
    color: "black",
    age: 10,
    bark: true  
}