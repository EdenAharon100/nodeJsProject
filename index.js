import express from "express";
import wineRouter from "./routes/Wines.js"
import userRouter from "./routes/Users.js"
import orderRouter from "./routes/Orders.js"
import { connect } from "./db/connectToDB.js "
import { errorHandling } from "./Middlewares/errorHandling.js"
import { config } from "dotenv";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use(express.static("files"));
connect();
config()




app.use("/api/wine", wineRouter)
app.use("/api/user",userRouter)
app.use("/api/order",orderRouter);
// app.use("/api/order",)

app.use(errorHandling);

app.listen(3500, () => {
    console.log("app is listenig on port 3500")
})
