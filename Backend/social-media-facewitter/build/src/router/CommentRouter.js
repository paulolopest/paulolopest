"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const CommentController_1 = require("../controller/CommentController");
const CommentBusiness_1 = require("../business/CommentBusiness");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const CommentData_1 = require("../data/CommentData");
const PostData_1 = require("../data/PostData");
const express_1 = __importDefault(require("express"));
const commentBusiness = new CommentBusiness_1.CommentBusiness(new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new CommentData_1.CommentData(), new PostData_1.PostData());
const commentController = new CommentController_1.CommentController(commentBusiness);
exports.commentRouter = express_1.default.Router();
exports.commentRouter.get("/:commentId/get-likes-comment", commentController.getCommentLike);
exports.commentRouter.get("/:postId/get-comment", commentController.getComments);
exports.commentRouter.delete("/:commentId/test", commentController.dislikePost);
exports.commentRouter.delete("/:commentId/delete-comment", commentController.delete);
exports.commentRouter.post("/:commentId/like-comment", commentController.likeComment);
exports.commentRouter.post("/:postId/comment", commentController.comment);
exports.commentRouter.put("/:commentId/edit-comment", commentController.edit);
//# sourceMappingURL=CommentRouter.js.map