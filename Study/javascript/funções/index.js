function verifyValue (value) {
    return console.log(!!value)
}

verifyValue(2)

//____________

function perimeter (x, y) {
    p = x * 2 + y * 2
    
    return console.log(p)
}

perimeter(4, 5)

//____________

function fullName (name, lastName) {
    return console.log(`Your name is ${name} ${lastName}`)
}

fullName("Paulo", "Tarso")

//____________

function verifyNumber (number) {
    var verify = number % 2
    if (verify == 0) {
        console.log("Even")
    } else {
        console.log("Odd")
    }
}

verifyNumber(15)

//____________

function verifyType (parameter) {
    return console.log(typeof parameter)
}

verifyType(10)

//____________

addEventListener("scroll", () => {
    console.log("Paulo Tarso")
})