import { CardBusiness } from "../business/CardBusiness";
import { ProductBusiness } from "../business/ProductBusiness";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { CardController } from "../controller/CardController";
import { ProductController } from "../controller/ProductController";
import { PaymentController } from "../controller/PaymentController";
import { UserController } from "../controller/UserController";
import { CardData } from "../data/CardData";
import { ProductData } from "../data/ProductData";
import { PaymentData } from "../data/PaymentData";
import { UserData } from "../data/UserData";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const userBussines = new UserBusiness(
    new Authenticator(),
    new HashManager(),
    new IdGenerator(),
    new UserData(),
)

export const cardBusiness = new CardBusiness(
    new Authenticator(),
    new HashManager(),
    new IdGenerator(),
    new CardData(),
)


export const userController = new UserController(userBussines)
export const cardController =  new CardController(cardBusiness)
export const userData = new UserData()

export const cardData = new CardData()

export const productController = new ProductController()
export const productBusiness = new ProductBusiness(
    new Authenticator(),
    new IdGenerator(),
    new ProductData(),
    new UserData()
)
export const productData = new ProductData()

export const paymentController = new PaymentController()
export const paymentBusiness = new PaymentBusiness(
    new Authenticator(),
    new IdGenerator(),
    new PaymentData()
)
export const paymentData = new PaymentData()

export const idGenerator = new IdGenerator()
export const hashManager = new HashManager()
export const authenticator = new Authenticator()