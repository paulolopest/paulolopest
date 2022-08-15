import { authenticator, cardData, hashManager, idGenerator, paymentData } from "../models/Classes";
import { verifyDate } from "../services/Date";

export class PaymentBusiness {
    creditPayment = async(cardNumber: string, cvv: string, cardName: string, token: string, productId: string, cardValidation: Date) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!cardNumber) {
            throw new Error("Enter a card number")
        }
        if(!cvv) {
            throw new Error("Enter a CVV")
        }
        if(!cardName) {
            throw new Error("Enter a card name")
        }
        if(!cardValidation) {
            throw new Error("Enter a card validation date")
        }

        const userId = authenticator.getTokenData(token)
        const id = idGenerator.generateId()
        let today = new Date()

        const isInvalid = await verifyDate(cardValidation)
        if(isInvalid) {
            throw new Error("Invalid date")
        }

        const response = await paymentData.creditPayment({
            id: id,
            userId: userId.id,
            productId: productId,
            cardNumber: cardNumber,
            cardName: cardName,
            cardValidation: cardValidation,
            date: today
        })
    }

    boletoPayment = async(token: string, productId: string) => {
        if(!token) {
            throw new Error("Login first")
        }

        const paymentId = idGenerator.generateId()
        const userId = authenticator.getTokenData(token)
        const today = new Date()
        const barCode = idGenerator.generateId()

        const response = await paymentData.boletoPayment({
            id: paymentId,
            userId: userId.id,
            productId: productId,
            date: today,
            barCode: barCode
        })
    }

    getCardPayment = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        const userId = authenticator.getTokenData(token)
        const response = await paymentData.getCardPayment(userId.id)

        return response
    }
    getBoletoPayment = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        const userId = authenticator.getTokenData(token)
        const response = await paymentData.getBoletoPayment(userId.id)

        return response
    }
}
