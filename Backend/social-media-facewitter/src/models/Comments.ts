export class Comment {
    constructor(
        private id: string,
        private userId: string,
        private postId: string,
        private content: string,
        private likes?: string
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
    public getLikes (): string | undefined{
        return this.likes
    }
}