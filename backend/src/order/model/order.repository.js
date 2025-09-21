import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  return await OrderModel.create(data);
};

export const findOrderByIdRepo = async (id) => {
  return await OrderModel.findById(id).populate("user", "name email").populate("orderedItems.product", "name price image");
}

export const findOrderByUserIdRepo = async (userId) => {
  // Write your code here to get all orders of a single user
  return await OrderModel.find({ user: userId }).populate("user", "name email").populate("orderedItems.product", "name price image");
}