export class Post {
    constructor(
        protected id: string,
        protected user_id: string,
        protected created_at: Date | number,
        protected image?: Blob,
        protected content?: string
    ) {}

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

export class Like {
    constructor (
        protected userId: string,
        protected postId: string
    ) {}

    public getUserId(): string {
        return this.userId
    }
    public getPostId(): string {
        return this.postId
    }
}