export class Comment {
    constructor(
        private id: string,
        private userId: string,
        private postId: string,
        private content: string,
        private createdAt: number
    ) {}

    public getId (): string {
        return this.id
    }
    public getUserId (): string {
        return this.userId
    }
    public getPostId (): string {
        return this.postId
    }
    public getContent (): string {
        return this.content
    }
    public getDate (): number {
        return this.createdAt
    }
}

export class LikePost {
    constructor (
        private userId: string,
        private commentId: string
    ) {}

    public getUserId(): string {
        return this.userId
    }
    public getCommentId(): string {
        return this.commentId
    }
}