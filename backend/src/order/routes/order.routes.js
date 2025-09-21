import express from "express";
import { createNewOrder, getOrderDetails, myOrders } from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";
import { validateOrder } from "../../../middlewares/validateOrder.js";

const router = express.Router();

router.route("/new").post(auth, authByUserRole("user"), validateOrder, createNewOrder);

router.route("/:id").get(auth, authByUserRole("user"), getOrderDetails);

router.route("/my/orders").get(auth, authByUserRole("user"), myOrders);

export default router;
