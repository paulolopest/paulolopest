import { paymentBusiness, paymentData } from "../models/Classes";
import { BoletoPayment, CreditPayment } from "../models/Payment";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentData extends BaseDatabase {
    creditPayment = async(creditPayment: CreditPayment) => {
        const response = await this.connection("metabum_creditPayment")
        .insert({
            id: creditPayment.id,
            user_id: creditPayment.userId,
            product_id: creditPayment.productId,
            card_number: creditPayment.cardNumber,
            card_name: creditPayment.cardName,
            card_validation: creditPayment.cardValidation,
            date: creditPayment.date
        })
    }

    boletoPayment = async(boletoPayment: BoletoPayment) => {
        const reponse = await this.connection("metabum_boletoPayment")
        .insert({
            id: boletoPayment.id,
            user_id: boletoPayment.userId,
            product_id: boletoPayment.productId,
            date: boletoPayment.date,
            bar_code: boletoPayment.barCode
        })
    }

    getCardPayment = async(userId: string) => {
        const result = await this.connection("metabum_creditPayment")
        .where({user_id: userId})

        return result
    }

    getBoletoPayment = async(userId: string) => {
        const result = await this.connection("metabum_boletoPayment")
        .where({user_id: userId})

        return result
    }

}