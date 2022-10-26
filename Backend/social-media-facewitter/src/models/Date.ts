export const verifyDate = async(validationDate:Date):Promise <boolean> => {
    let today = new Date()
    let informedDate = new Date(validationDate)

    let currentTime = today.getTime()
    let expirationDate = informedDate.getTime()

    const verify = expirationDate < currentTime

    return verify
}

export const today = new Date()
export const currentTime = today.getTime()
export const createdDate = new Date(currentTime)
export const test = new Date().toUTCString()
