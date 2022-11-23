import { Like, Post } from "../../../src/models/Post"

export class PostMock extends Post {
    public getId(): string {
        return this.id
    }
    public getUserId(): string {
        return this.user_id
    }
    public getDate(): Date | number{
        return this.created_at
    }
    public getImage(): Blob | undefined {
        return this.image
    }
    public getContent(): string | undefined {
        return this.content
    }
}

export const postMock = new PostMock (
    "mocked_postId",
    "mocked_userId",
    "2022/08/24" as unknown as Date,
    undefined,
    "Post content"
) 

//
//
//

export class LikeMock extends Like {
    public getUserId(): string {
        return this.userId
    }
    public getPostId(): string {
        return this.postId
    }
}

export const likeMock = new LikeMock (
    "mocked_userId",
    "mocked_postId"
)