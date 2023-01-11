"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=index.js.map