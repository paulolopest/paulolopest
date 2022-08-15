import { Request, Response } from "express";
import { paymentBusiness, productBusiness } from "../models/Classes";

export class PaymentController {
  creditPayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const productId = req.params.productId;
      const { cardNumber, cvv, cardName, cardValidation } = req.body;

      const response = await paymentBusiness.creditPayment(cardNumber, cvv, cardName, token, productId, cardValidation);

      res.send("Purchase made");
    } catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }

  boletoPayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const productId = req.params.productId

      const response = await paymentBusiness.boletoPayment(token, productId)

      res.send("Purchase made")
    } catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }

  getBoletoPayment = async(req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const response = await paymentBusiness.getBoletoPayment(token)

      res.send(response)
    }catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }
  getCardPayment = async(req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const response = await paymentBusiness.getCardPayment(token)

      res.send(response)
    }catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }

}
