import express, {Express, Request, Response} from "express"
import {AddressInfo} from "net"
import { followRouter } from "./router/FollowRouter"
import { postRouter } from "./router/PostRouter"
import { userRouter } from "./router/UserRouter"

const app: Express = express()
app.use(express.json())

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error("Failed to start the server.");
    }
})

app.use(userRouter)
app.use(followRouter)
app.use(postRouter)