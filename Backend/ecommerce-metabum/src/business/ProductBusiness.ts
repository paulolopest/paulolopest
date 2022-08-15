import { authenticator, idGenerator, productData, userData } from "../models/Classes"

export class ProductBusiness {
    insertProduct = async(name: string, productImg: string, price: number, tags: string, description: string, token: string) => {
        if(!token) {
            throw new Error("Login First")
        }
        if(!name) {
            throw new Error("Enter a name")
        }
        if(!productImg) {
            throw new Error("Enter a link for productImg")
        } else if (productImg.indexOf("https://") === -1) {
            throw new Error("Enter a valid link")
        }
        if(!price) {
            throw new Error("Enter a price")
        } else if (price <= 0) {
            throw new Error("Enter a valid price")
        }
        if(!tags) {
            throw new Error("Enter a tags")
        }
        if(!description) {
            throw new Error("Enter a description")
        }

        const userId = authenticator.getTokenData(token)
        const identify = await userData.getUserById(userId.id)

        if(identify.role != "Administrator") {
            throw new Error("Just admin can insert products")
        }
        const id = idGenerator.generateId()

        await productData.insertProduct({
            id: id,
            name: name,
            productImg: productImg,
            price: price,
            tags: tags,
            description: description
        })
    }

    getProducts = async (productName: string) => {
        if(!productName) {
            const response = await productData.getProducts()

            return response
        }

        if(productName){
            const result = await productData.getProductByName(productName)

            return result
        }
    }

    editPrice = async(token: string, price: number, productId: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!price) {
            throw new Error("Enter a price")
        }

        const userId = authenticator.getTokenData(token)
        const identify = await userData.getUserById(userId.id)

        if(identify.role != "Administrator") {
            throw new Error("Just administrator can edit the price")
        }
        const response = await productData.editPrice(price, productId)
    }

    deleteProduct = async(token: string, productId: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!productId) {
            throw new Error("Enter a product id")
        }

        const userId = authenticator.getTokenData(token)
        const identify = await userData.getUserById(userId.id)

        if(identify.role != "Administrator") {
            throw new Error("Just admin can delete product")
        }

        const response = await productData.deleteProduct(productId)
    }

}