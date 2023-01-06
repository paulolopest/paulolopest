"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const PostController_1 = require("../controller/PostController");
const PostBusiness_1 = require("../business/PostBusiness");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const PostData_1 = require("../data/PostData");
const UserData_1 = require("../data/UserData");
const express_1 = __importDefault(require("express"));
const postBusiness = new PostBusiness_1.PostBusiness(new PostData_1.PostData(), new UserData_1.UserData(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator());
const postController = new PostController_1.PostController(postBusiness);
exports.postRouter = express_1.default.Router();
exports.postRouter.post('/add-post', postController.createPost);
exports.postRouter.put('/post/edit', postController.editPost);
exports.postRouter.get('/all-posts', postController.getAllPosts);
exports.postRouter.get('/search/tags/:tags', postController.getPostByTag);
exports.postRouter.get('/search/post/:title', postController.searchPost);
exports.postRouter.get('/search/author/:author', postController.getPostByAuthor);
exports.postRouter.delete('/post/:id/delete', postController.deletePost);
//# sourceMappingURL=PostRouter.js.map