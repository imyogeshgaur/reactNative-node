import express, { urlencoded, json } from "express"
import cors from "cors"
import userRouter from "./routes/user.routes";
import connectWithDB from "./database/db.config";

const app = express();

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({
    origin: "http://loclhost:190000"
}))

connectWithDB();

app.use("/user", userRouter)

app.listen(3000)