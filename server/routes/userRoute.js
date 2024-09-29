import express from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

let router = express.Router();

router.get("/getusers", verifyToken, getUsers);
router.delete("/deleteuser/:id", verifyToken, deleteUser);

export default router;
