import express from "express";
import morgan from "morgan";
import cors from "cors";
import {db} from "../db/db";
import authRoutes from "./routes/auth_routes";

const PORT = process.env.PORT || 8080;
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes)

app.get("/", (req, res) => {
  res.send({
    message: "Study Adda",
  });
});
console.log(db)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
