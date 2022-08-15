"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticator = exports.hashManager = exports.idGenerator = exports.paymentData = exports.paymentBusiness = exports.paymentController = exports.productData = exports.productBusiness = exports.productController = exports.cardData = exports.cardBusiness = exports.cardController = exports.userData = exports.userBusiness = exports.userController = void 0;
const CardBusiness_1 = require("../business/CardBusiness");
const ProductBusiness_1 = require("../business/ProductBusiness");
const PaymentBusiness_1 = require("../business/PaymentBusiness");
const UserBusiness_1 = require("../business/UserBusiness");
const CardController_1 = require("../controller/CardController");
const ProductController_1 = require("../controller/ProductController");
const PaymentController_1 = require("../controller/PaymentController");
const UserController_1 = require("../controller/UserController");
const CardData_1 = require("../data/CardData");
const ProductData_1 = require("../data/ProductData");
const PaymentData_1 = require("../data/PaymentData");
const UserData_1 = require("../data/UserData");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.userController = new UserController_1.UserController();
exports.userBusiness = new UserBusiness_1.UserBusiness();
exports.userData = new UserData_1.UserData();
exports.cardController = new CardController_1.CardController();
exports.cardBusiness = new CardBusiness_1.CardBusiness();
exports.cardData = new CardData_1.CardData();
exports.productController = new ProductController_1.ProductController();
exports.productBusiness = new ProductBusiness_1.ProductBusiness();
exports.productData = new ProductData_1.ProductData();
exports.paymentController = new PaymentController_1.PaymentController();
exports.paymentBusiness = new PaymentBusiness_1.PaymentBusiness();
exports.paymentData = new PaymentData_1.PaymentData();
exports.idGenerator = new IdGenerator_1.IdGenerator();
exports.hashManager = new HashManager_1.HashManager();
exports.authenticator = new Authenticator_1.Authenticator();
//# sourceMappingURL=Classes.js.map