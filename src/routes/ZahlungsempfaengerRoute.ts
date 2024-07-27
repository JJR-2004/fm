// import app from "../../server";
import express, { Router } from "express";
import * as zahlungsempfaengerUtils from "../utils/zahlungsempfaengerUtils";

class girokontoRouter {
    router = Router();

    constructor() {
        this.router.get("/get", zahlungsempfaengerUtils.get);
        this.router.get(
            "/readIn",
            zahlungsempfaengerUtils.readInZahlungsempfänger
        );
    }
}

export default girokontoRouter;
