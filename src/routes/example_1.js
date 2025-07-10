/*
    ============EXAMPLE ROUTE FILE============
    Path to here: {base_url}/api/example_1/
    ==========================================
*/

import express from "express";
import * as testControllers from "../controllers/example.js";
const router = express.Router();

// Path to this endpoint: {base_url}/api/example1/get_route
router.get("/get_route", testControllers.testController);

// Path to this endpoint: {base_url}/api/example1/post_route
router.post("/post_route", testControllers.testController);

// Path to this endpoint: {base_url}/api/example1/put_route
router.put("/put_route", testControllers.testController);

// Path to this endpoint: {base_url}/api/example1/delete_route
router.delete("/delete_route", testControllers.testController);

export default router;
