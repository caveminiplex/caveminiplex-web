import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import v1Routes from "./routes/v1/index";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "https://miniplex-red.vercel.app"],
    credentials: true,
  })
);

app.use("/api/v1", v1Routes);

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
});
