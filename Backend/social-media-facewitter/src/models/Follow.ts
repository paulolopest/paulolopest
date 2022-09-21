export class Follow {
    constructor (
        private userId: string,
        private followedId: string
    ) {}

    getUserId (): string {
        return this.userId
    }
    getFollowedId (): string {
        return this.followedId
    }
}