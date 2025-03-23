import express from "express";
import { createNewOrder } from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";
import { validateOrder } from "../../../middlewares/validateOrder.js";

const router = express.Router();

router.route("/new").post(auth, authByUserRole("user"), validateOrder, createNewOrder);

export default router;
