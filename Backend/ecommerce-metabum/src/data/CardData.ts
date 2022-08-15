import { Card } from "../models/Card";
import { BaseDatabase } from "./BaseDatabase";

export class CardData extends BaseDatabase {
    createCard = async(card: Card) => {
        await this.connection("metabum_card")
        .insert({
            id: card.id,
            name: card.name,
            number: card.number,
            cvv: card.cvv,
            validation_date: card.validationDate,
            user_id: card.userId
        })
    }

    selectCardByNumber = async(number: string) => {
        try {
            const response = await this.connection("metabum_card")
            .where({number: number})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    validateCard = async(number: string, id: string) => {
        try {
            const response = await this.connection("metabum_card")
            .select("*")
            .where({user_id: id})
            .and
            .where({number: number})

            return response[0]
        } catch(error:any) {
            throw new Error(error.message)
        }
    }

    getAllCards = async(userId: string) => {
        try {
            const response = await this.connection("metabum_card")
            .where({user_id: userId})

            return response
        } catch(error:any) {
            throw new Error(error.message)
        }
    }

    deleteCard = async(cardId: string) => {
        try {
            const response = await this.connection("metabum_card")
            .delete()
            .where({id: cardId})

        } catch(error:any) {
            throw new Error(error.message)
        }
    }
}