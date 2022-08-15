export type CreditPayment = {
    id: string,
    userId: string,
    productId: string,
    cardNumber: string,
    cardName: string
    cardValidation: Date
    date: Date
}

export type BoletoPayment = {
    id: string,
    userId: string,
    productId: string,
    date: Date,
    barCode: string
}