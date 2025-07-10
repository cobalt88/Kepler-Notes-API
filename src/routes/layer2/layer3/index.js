import express from "express";
const router = express.Router();
import example3Routes from "./example_3.js";

router.use("/example3", example3Routes);


export default router;