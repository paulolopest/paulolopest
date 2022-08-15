import knex from 'knex'
import dotenv from "dotenv"

dotenv.config()

export class BaseDatabase {
   protected connection = knex({
    client: 'mysql',
    connection: {
        host: "35.226.146.116",
        user: "21712944-paulo-lopes",
        password: "rSkTJ4uk#%xnHhzyR6Zf",
        database: "vaughan-21712944-paulo-lopes",
        port: 3306,
        multipleStatements: true
    }
})

}
