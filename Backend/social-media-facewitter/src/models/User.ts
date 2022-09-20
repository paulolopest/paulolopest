export class User {
    constructor (
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private birthDate: Date,
    ) {}

    public getId(): string {
        return this.id
    }
    public getName(): string {
        return this.name
    }
    public getNickname(): string {
        return this.nickname
    }
    public getEmail(): string {
        return this.email
    }
    public getPassword(): string {
        return this.password
    }
    public getBirthDate(): Date {
        return this.birthDate
    }
}