import express from "express";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;


app.use(cors())


app.get("/", (req, res) => {
    res.json({message:"It is working"})
})


app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})