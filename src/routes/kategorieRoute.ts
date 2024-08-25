// import app from "../../server";
import express, { Router } from "express";
import * as kategorieUtils from "../utils/kategoireUtils";

class kategorieRouter {
    router = Router();

    constructor() {
        this.router.get("/get", kategorieUtils.get);
    }
}

export default kategorieRouter;
