import express from "express";
const router = express.Router();
import example1Routes from "./example_1.js";

// This points to the example 1 file in this directory
router.use("/example1", example1Routes);

export default router;
