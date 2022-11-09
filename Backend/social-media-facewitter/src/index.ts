import { commentRouter } from "./router/CommentRouter"
import { followRouter } from "./router/FollowRouter"
import { userRouter } from "./router/UserRouter"
import { postRouter } from "./router/PostRouter"
import express, {Express} from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

const server = app.listen(3000, () => {
    if(server) {
        console.log(`The server is running in localhost:3000`)
    } else {
        console.log("Error in running the server")
    }
})

app.use(userRouter)
app.use(postRouter)
app.use(followRouter)
app.use(commentRouter)


// mexer na logica do refresh token, mudar pra allowlist ****
// mandar os shares junto no get my posts (adicionar created_at no share)
// adicionar um orderby nos posts
// readicionar as foreign keys nas tabelas
// ver o video do dechamps
// tentar testar a api sem mock
// testes