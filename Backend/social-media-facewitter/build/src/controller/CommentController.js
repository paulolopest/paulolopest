"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
class CommentController {
    constructor(commentBusiness) {
        this.commentBusiness = commentBusiness;
        this.comment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { content } = req.body;
                const { postId } = req.params;
                yield this.commentBusiness.comment(token, postId, content);
                res.status(202).send("Commented");
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
        this.getComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.params;
                const response = yield this.commentBusiness.getComments(token, postId);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
        this.edit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { commentId } = req.params;
                const { content } = req.body;
                yield this.commentBusiness.edit(token, commentId, content);
                res.status(200).send("Edited comment");
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { commentId } = req.params;
                yield this.commentBusiness.delete(token, commentId);
                res.status(200).send("Comment deleted");
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
        this.likeComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { commentId } = req.params;
                yield this.commentBusiness.likePost(token, commentId);
                res.status(200).send("Comment liked");
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
        this.dislikePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { commentId } = req.params;
                yield this.commentBusiness.dislikePost(token, commentId);
                res.status(200).send("Comment disliked");
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
        this.getCommentLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { commentId } = req.params;
                const response = yield this.commentBusiness.getCommentLike(token, commentId);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map