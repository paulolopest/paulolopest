export class Post {
    constructor(
        private id: string,
        private user_id: string,
        private likes: number,
        private created_at: Date,
        private image?: Blob,
        private description?: string
    ) {}

    public getId(): string {
        return this.id
    }
    public getUserId(): string {
        return this.user_id
    }
    public getLikes(): number {
        return this.likes
    }
    public getDate(): Date {
        return this.created_at
    }
    public getImage(): Blob | undefined {
        return this.image
    }
    public getDescription(): string | undefined {
        return this.description
    }
}