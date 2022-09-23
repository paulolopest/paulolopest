export class Follow {
    constructor (
        private user_id: string,
        private followed_id: string
    ) {}

    public getUserId (): string {
        return this.user_id
    }
    public getFollowedId(): string {
        return this.followed_id
    }
}