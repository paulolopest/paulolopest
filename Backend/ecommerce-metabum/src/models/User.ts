export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private cpf: string
    ){}

    public getId(): string {
        return this.id
    }
    
    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }

    public getCpf(): string {
        return this.cpf
    }
}

export enum ROLE {
    NORMAL = "Normal",
    ADMIN = "Administrator"
}