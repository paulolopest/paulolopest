import { authenticator, cardData, hashManager, idGenerator } from "../models/Classes"
import { verifyDate } from "../services/Date"

export class CardBusiness {
    createCard = async(name: string, number: string, cvv: string, validationDate: Date, token: string) => {
        if(!name) {
            throw new Error("Enter a name")
        }
        if(!number) {
            throw new Error("Enter a card number")
        } else if (number.length != 16) {
            throw new Error("Invalid card number. The card must contain 16 characters")
        }
        if(!cvv) {
            throw new Error("Enter a cvv")
        } else if (cvv.length != 3) {
            throw new Error("Invalid cvv. The cvv must contain 3 characters")
        }
        if(!validationDate) {
            throw new Error("Enter a validation date")
        }

        const isInvalid = await verifyDate(validationDate)
        if(isInvalid) {
            throw new Error("Invalid Date")
        }

        if(!token) {
            throw new Error("Login first")
        }
        const userId = authenticator.getTokenData(token)
        const cardExist = await cardData.validateCard(number, userId.id)

        if(cardExist) {
            throw new Error("Card already registered")
        }

        const id = idGenerator.generateId()
        const cypherCvv = await hashManager.generateHash(cvv)

        await cardData.createCard({
            id: id,
            name: name,
            number: number,
            cvv: cypherCvv,
            validationDate: validationDate,
            userId: userId.id
        })
    }

    getAllCards = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }

        const userId = authenticator.getTokenData(token)

        const response = await cardData.getAllCards(userId.id)

        return response
    }

    deleteCard = async(token: string, cardId: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!cardId) {
            throw new Error("Enter a card id")
        }

        const response = await cardData.deleteCard(cardId)
    }
}
