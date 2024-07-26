// import app from "../../server";
import express, { Router } from "express";
import * as services from "../utils/girokontoUtils";

class zahlumgsempfaengerRouter {
    router = Router();

    constructor() {
        this.router.post("/readIn", services.readIn);
        this.router.get("/get", services.get);
    }
}

export default zahlumgsempfaengerRouter;
