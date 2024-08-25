// import app from "../../server";
import express, { Router } from "express";
import * as toolsUtils from "../utils/index";

class csvRouter {
    router = Router();

    constructor() {
        this.router.post("/readIn", toolsUtils.readInCSVData);
    }
}

export default csvRouter;
