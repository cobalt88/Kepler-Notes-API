/*
    ============EXAMPLE ROUTE FILE============
    Path to here: {base_url}/api/layer2/example_2/
    ==========================================
*/

import express from "express";
import * as testControllers from "../../controllers/example.js";
const router = express.Router();

// Path to this endpoint: {base_url}/api/layer2/example2/get_route
router.get("/get_route", testControllers.testController2);

// Path to this endpoint: {base_url}/api/layer2/example2/post_route
router.post("/post_route", testControllers.testController);

// Path to this endpoint: {base_url}/api/layer2/example2/put_route
router.put("/put_route", testControllers.testController);

// Path to this endpoint: {base_url}/api/layer2/example2/delete_route
router.delete("/delete_route", testControllers.testController);

export default router;
