// import app from "../../server";
import express, { Router } from "express";
import * as services from "../utils/zahlungsempfaenger";

class girokontoRouter {
    router = Router();

    constructor() {
        this.router.get("/get", services.readInZahlungsempfänger);
    }
}

export default girokontoRouter;
