import { LikeMock, likeMock, PostMock, postMock } from "./PostMock";
import { BaseDatabase } from "../../../src/data/BaseDatabase";

export class PostDataMock extends BaseDatabase{
    tableName: string = "facewitter_posts"

    create = async (post: PostMock) => {};

    getMyPosts = async (id: string): Promise<any> => {
        if(id === "mocked_userId") {
            return postMock
        } else {
            undefined
        }
    };

    getFeed = async (id: string) => {}

    editPost = async(postId: string, content: string) => {}

    getPostById = async (postId: string): Promise<any> => {
        if(postId === "mocked_postId") {
            return postMock
        } else if(postId != "mocked_postId") {
            return "Post not exist"
        }
    }

    deletePost = async (postId: string, userId: string) => {}

    likePost = async(like: LikeMock) => {}

    dislikePost = async (postId: string, userId: string) => {}

    sharePost = async(userId: string, postId: string) => {}

    getSharePost = async (userId: string, postId: string) => {}

    deleteShare = async (userId: string, postId: string) => {}

    getPostLikes = async (postId: string): Promise<any> => {
        if (postId === "mocked_postId") {
            return likeMock
        }
    }

    searchLike = async (userId: string, postId: string): Promise<any> => {
        if(userId === "mocked_userId" && postId === "mocked_postId") {
            return "Post already liked"
        } else {
            "Post not liked"
        }
    } 
}
