export const verifyDate = async(validationDate:Date):Promise <boolean> => {
    let today = new Date()
    let informedDate = new Date(validationDate)

    let currentTime = today.getTime()
    let expirationDate = informedDate.getTime()

    const verify = expirationDate < currentTime

    return verify
}

// const data = new Date( Date.now() )
// const today = data.toLocaleDateString( 'pt-BR' )
// const time = new Date().toLocaleTimeString()
// export const createdDate = ( `${today}, ${time}` )

const today = new Date()
const currentTime = today.getTime()

export const createdDate = new Date(currentTime)
