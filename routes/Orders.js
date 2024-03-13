// import { addOrder, deleteOrder, getAllOrders, updateOrder, getAllOrdersByUser } from "../controllers/Order.js";
// import express from "express";
// import { auth, authAdmin } from "../Middlewares/auth.js";

// const router = express.Router();

// router.get("/", auth, addOrder);
// router.post("/:id", authAdmin, updateOrder);

// export default router;
import express from "express";
import { getAllOrders, getAllOrdersByUser, addOrder, deleteOrder, updateOrder } from "../controllers/Order.js";
import { auth, authAdmin } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", auth, getAllOrdersByUser);
router.delete("/:id", auth, deleteOrder);
router.put("/:id", authAdmin,updateOrder);
router.post("/", auth, addOrder);

export default router;