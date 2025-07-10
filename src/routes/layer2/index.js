import express from "express";
const router = express.Router();
import example2Routes from "./example_2.js";
import layer3Routes from "./layer3/index.js";


router.use("/example2", example2Routes);
router.use("/layer3", layer3Routes);


export default router;