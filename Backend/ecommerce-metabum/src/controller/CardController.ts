import {Request, Response} from "express"
import { cardBusiness } from "../models/Classes"

export class CardController {
    createCard = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {name, number, cvv, validationDate} = req.body
            const response = await cardBusiness.createCard(name, number, cvv, validationDate, token)

            res.status(201).send("The card was successfully registered")
        } catch(error:any) {
            res.send(error.message || error.sqlMessage)
        }
    }

    getAllCards = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await cardBusiness.getAllCards(token)

            res.status(201).send(response)
        } catch (error:any) {
            res.send(error.message || error.sqlMessage)
        }
    }

    deleteCard = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const cardId = req.params.cardId
            const response = await cardBusiness.deleteCard(token, cardId)

            res.send("Card deleted")
        } catch(error:any) {
            res.send(error.message || error.sqlMessage)
        }
    }
}
