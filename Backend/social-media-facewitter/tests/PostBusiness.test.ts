import { TokenManagerMock } from "./mocks/servicesMock/TokenManagerMock";
import { IdGeneratorMock } from "./mocks/servicesMock/IdGeneratorMock";
import { PostDataMock } from "./mocks/postMock/PostDataMock";
import { PostBusiness } from "../src/business/PostBusiness";
import { postMock } from "./mocks/postMock/PostMock";

const postBusinessMock: PostBusiness = new PostBusiness(
    new PostDataMock(),
    new IdGeneratorMock,
    new TokenManagerMock
)

describe("Create Post test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.create(
                "",
                "post content"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when content is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.create(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("The post must contain some content")
        }
    })

    test ("Return when create post succeeded", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.create(
                "mocked_token",
                "Post content"
            )

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Get My Posts test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.getMyPosts("")

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when get my post succeeded", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.getMyPosts("mocked_token")

            expect(result).toBeDefined()
            expect(result).toEqual(postMock)
        } catch (error:any) {
            throw new Error(error.message)
        }
    })

})

describe("Get Feed test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.getFeed("")

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })
})

describe("Edit post test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.editPost(
                "",
                "mocked_postId",
                "Post Content"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.editPost(
                "mocked_token",
                "",
                "Post Content"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })

    test ("Return when post content is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.editPost(
                "mocked_token",
                "mocked_postId",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a content")
        }
    })

    test ("Return when post is not from the user", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.editPost(
                "mocked_token",
                "mocked_postId2",
                "Post content"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("The post is not yours")
        }
    })

    test ("Return when edit post succeeded", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.editPost(
                "mocked_token",
                "mocked_postId",
                "Post content"
            )

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Delete post test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deletePost(
                "",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deletePost(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })

    test ("Return when post is not from the user", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deletePost(
                "mocked_token",
                "mocked_postId2"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("The post is not yours")
        }
    })
    test ("Return when delete post succeeded", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deletePost(
                "mocked_token",
                "mocked_postId"
            )

            expect(result).toBeUndefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Like post test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.likePost(
                "",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.likePost(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })

    test ("Return when post is already liked", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.likePost(
                "mocked_token",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Post already liked")
        }
    })

})

describe("Dislike post test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.dislikePost(
                "",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.dislikePost(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })

    test ("Return when post is not liked", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.dislikePost(
                "mocked_token",
                "mocked_postId2"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Post not liked")
        }
    })

})

describe("Get Post Likes test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.getPostLikes(
                "",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.getPostLikes(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })
})

describe("Share Post test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.sharePost(
                "",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.sharePost(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })
})

describe("Delete Share test", () => {
    test ("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deleteShare(
                "",
                "mocked_postId"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deleteShare(
                "mocked_token",
                ""
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a post id")
        }
    })

    test ("Return when post id is missing", async () => {
        expect.assertions
        try {
            const result = await postBusinessMock.deleteShare(
                "mocked_token",
                "mocked_postId2"
            )

            expect(result).toBeDefined()
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Post is not yours")
        }
    })
})
