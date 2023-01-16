"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransferenceRouter_1 = require("./router/transference/TransferenceRouter");
const CardRouter_1 = require("./router/card/CardRouter");
const UserRouter_1 = require("./router/user/UserRouter");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = app.listen(port, () => {
    if (server) {
        console.log(`The server is running on localhost:${port}`);
    }
    else {
        console.log('Error running the server');
    }
});
app.use(UserRouter_1.userRouter);
app.use(CardRouter_1.cardRouter);
app.use(TransferenceRouter_1.transferenceRouter);
//# sourceMappingURL=index.js.map