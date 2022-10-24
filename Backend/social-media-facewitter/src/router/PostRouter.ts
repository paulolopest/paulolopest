import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { PostData } from "../data/PostData";
import express, { Router } from "express";

const postBusiness: PostBusiness = new PostBusiness (
    new PostData(),
    new IdGenerator(),
    new TokenManager()
)

const postController = new PostController (postBusiness)

export const postRouter: Router = express.Router()

// Routes

postRouter.post("/:postId/like", postController.likePost)
postRouter.get("/profile/posts", postController.getMyPosts)
postRouter.post("/create-post", postController.create)
postRouter.put("/:postId/edit", postController.editPost)
postRouter.delete("/:postId/delete", postController.deletePost)