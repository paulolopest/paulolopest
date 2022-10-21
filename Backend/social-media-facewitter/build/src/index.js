"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowRouter_1 = require("./router/FollowRouter");
const UserRouter_1 = require("./router/UserRouter");
const PostRouter_1 = require("./router/PostRouter");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = app.listen(3000, () => {
    if (server) {
        console.log(`The server is running in localhost:3000`);
    }
    else {
        console.log("Error in running the server");
    }
});
app.use(UserRouter_1.userRouter);
app.use(PostRouter_1.postRouter);
app.use(FollowRouter_1.followRouter);
//# sourceMappingURL=index.js.map