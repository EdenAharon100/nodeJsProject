import express from "express";
import { addUser, getAllUsres, login } from "../controllers/Users.js"
import { auth, authAdmin } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/", getAllUsres);
router.post("/", addUser);
router.post("/login", login)

export default router;