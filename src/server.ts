import express from "express";
import cors from "cors";
import zahlumgsempfaengerRouter from "./routes/ZahlungsempfaengerRoute";
import girokontoRouter from "./routes/girokontoRoute";
import morgan from "morgan";

const app = express();

const port = 2999;

app.use(morgan("combined"));

app.use(cors());
// Middleware to parse JSON bodies

app.use("/zahlungsempfaenger", new zahlumgsempfaengerRouter().router);
app.use("/girokonto", new girokontoRouter().router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
