import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import v1Routes from "./routes/v1/index"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;


app.use(cors())


app.use("/api/v1", v1Routes);


app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})