import { CommentController } from "../controller/CommentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { CommentData } from "../data/CommentData"
import { PostData } from "../data/PostData"
import express, { Router } from "express"

const commentBusiness: CommentBusiness = new CommentBusiness(
    new TokenManager(),
    new IdGenerator(),
    new CommentData(),
    new PostData()
)
const commentController: CommentController = new CommentController(commentBusiness)

export const commentRouter: Router = express.Router()

commentRouter.delete("/:commentId/delete-comment", commentController.delete)
commentRouter.get("/:postId/get-comment", commentController.getComments)
commentRouter.put("/:commentId/edit-comment", commentController.edit)
commentRouter.post("/:postId/comment", commentController.comment)
commentRouter.put("/:commentId/like", commentController.like)
commentRouter.put("/:commentId/dislike", commentController.dislike)