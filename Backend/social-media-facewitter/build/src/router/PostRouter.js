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
const express_1 = __importDefault(require("express"));
const postBusiness = new PostBusiness_1.PostBusiness(new PostData_1.PostData(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager());
const postController = new PostController_1.PostController(postBusiness);
exports.postRouter = express_1.default.Router();
exports.postRouter.get("/:postId/get-likes", postController.getPostLikes);
exports.postRouter.delete("/:postId/dislike", postController.dislikePost);
exports.postRouter.delete("/:postId/delete", postController.deletePost);
exports.postRouter.get("/profile/posts", postController.getMyPosts);
exports.postRouter.post("/:postId/like", postController.likePost);
exports.postRouter.put("/:postId/edit", postController.editPost);
exports.postRouter.post("/create-post", postController.create);
exports.postRouter.get("/myFeed", postController.getFeed);
//# sourceMappingURL=PostRouter.js.map