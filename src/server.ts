import express from "express";
import cors from "cors";
import zahlumgsempfaengerRouter from "./routes/Zahlungsempfaenger";
import girokontoRouter from "./routes/girokonto";
import morgan from "morgan";
import { dbConnect } from "./database/dbConnector";

const app = express();

const port = 2999;

await dbConnect();

app.use(morgan("combined"));

app.use(cors());
// Middleware to parse JSON bodies

app.use("/Zahlungsempfaenger", new zahlumgsempfaengerRouter().router);
app.use("/girokonto", new girokontoRouter().router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
