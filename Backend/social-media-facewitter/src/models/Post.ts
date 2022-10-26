export class Post {
    constructor(
        private id: string,
        private user_id: string,
        private created_at: Date | number,
        private image?: Blob,
        private content?: string
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
        private userId: string,
        private postId: string
    ) {}

    public getUserId(): string {
        return this.userId
    }
    public getPostId(): string {
        return this.postId
    }
}