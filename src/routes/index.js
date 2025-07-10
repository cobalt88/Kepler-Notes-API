import express from "express";
const router = express.Router();
import layer2Routes from "./layer2/index.js";
import example1Routes from "./example_1.js" 

router.use("/layer2", layer2Routes);
// This points to the example 1 file in this directory
router.use("/example1", example1Routes);


export default router;