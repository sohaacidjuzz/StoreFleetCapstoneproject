// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const {
      shippingInfo,
      orderedItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!shippingInfo || !orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const userId = req.user.id;

    const orderData = {
      shippingInfo,
      orderedItems,
      user: userId,
      paymentInfo,
      paidAt: Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }

    const newOrder = await createNewOrderRepo(orderData);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    return next(ErrorHandler(500, error))
  }
};
