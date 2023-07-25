import express from "express";

import {showChat} from "../controllers/homeChatController.js"

const router = express.Router();

router.get("/", showChat );

export default router;