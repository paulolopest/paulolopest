export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string
}

export enum ROLE {
    NORMAL = "Normal",
    ADMIN = "Administrator"
}