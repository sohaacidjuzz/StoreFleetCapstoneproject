import { check, validationResult } from "express-validator";

export const validateOrder = [
    check("shippingInfo.address").notEmpty().withMessage("Address is required"),
    check("shippingInfo.city").notEmpty().withMessage("City is required"),
    check("shippingInfo.state").notEmpty().withMessage("State is required"),
    check("shippingInfo.country").notEmpty().withMessage("Country is required"),
    check("shippingInfo.pincode").isNumeric().notEmpty().withMessage("Country code must be 2 letters (e.g., 'IN')"),
    check("shippingInfo.phoneNumber").isNumeric().isLength({min: 10, max: 10}).withMessage("Phone number must be a 10-digit number"),
    check("orderedItems").isArray({min: 1}).withMessage("At least one ordered item is required"),
    check("orderedItems")
    .isArray({ min: 1 })
    .withMessage("At least one ordered item is required"),
  check("orderedItems.*.product")
    .isMongoId()
    .withMessage("Invalid product ID"),
  check("orderedItems.*.name").notEmpty().withMessage("Product name is required"),
  check("orderedItems.*.price").isNumeric().withMessage("Price must be a number"),
  check("orderedItems.*.image").notEmpty().withMessage("Product image is required"),
  check("orderedItems.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  // Validate payment info
  check("paymentInfo.id").notEmpty().withMessage("Payment ID is required"),
  check("paymentInfo.status")
    .isBoolean()
    .withMessage("Payment status must be true or false"),

  // Validate price details
  check("itemsPrice").isNumeric().withMessage("Items price must be a number"),
  check("taxPrice").isNumeric().withMessage("Tax price must be a number"),
  check("shippingPrice").isNumeric().withMessage("Shipping price must be a number"),
  check("totalPrice").isNumeric().withMessage("Total price must be a number"),

   // Middleware to check validation result
   (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];