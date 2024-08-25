// import app from "../../server";
import express, { Router } from "express";
import * as girokontoUtils from "../utils/girokontoUtils";

class zahlumgsempfaengerRouter {
    router = Router();

    constructor() {
        this.router.get("/get", girokontoUtils.get);
        this.router.post("/insert", girokontoUtils.insert);
    }
}

export default zahlumgsempfaengerRouter;
