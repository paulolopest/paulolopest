export class HashManagerMock {
    hash = async (password: string) => {
        return "hashed_password"
    }

    compare = async (password: string, cypherPassword: string):Promise<boolean> => {
        if(password === cypherPassword) {
            return true
        } else {
            return false
        }
    }
}