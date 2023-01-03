"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./router/UserRouter");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
const server = exports.app.listen(port, () => {
    if (server) {
        console.log(`The server is running on localhost:${port}`);
    }
    else {
        console.log('Error running the server');
    }
});
exports.app.use(UserRouter_1.userRouter);
//# sourceMappingURL=index.js.map