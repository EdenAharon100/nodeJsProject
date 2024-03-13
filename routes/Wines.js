import express from "express";
import {getAllWines,getWinesById,deleteWinesById,addWine, updateWine} from "../controllers/Wine.js"
import { authAdmin ,auth} from "../Middlewares/auth.js";


const router = express.Router();

router.get("/",getAllWines);
router.get("/:id",getWinesById);
router.delete("/:id",authAdmin,deleteWinesById);
router.post("/",authAdmin,addWine);
router.put("/:id",updateWine);


export default router;