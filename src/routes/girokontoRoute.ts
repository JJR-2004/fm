// import app from "../../server";
import express, { Router } from "express";
import * as girokontoUtils from "../utils/girokontoUtils";

class zahlumgsempfaengerRouter {
    router = Router();

    constructor() {
        this.router.post("/readIn", girokontoUtils.readIn);
        this.router.get("/get", girokontoUtils.get);
    }
}

export default zahlumgsempfaengerRouter;
