import express from "express";

import { addUserToDB, createToken } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", addUserToDB);
router.post("/login", createToken);

export default router;
