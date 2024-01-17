import express from "express";
import morgan from "morgan";
import cors from "cors";
import {db} from "../db/db";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({
    message: "Study Adda",
  });
});
console.log(db)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
