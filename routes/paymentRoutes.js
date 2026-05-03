import express from "express";
import {
  createCheckoutSession,
  getCheckoutSession,
} from "../controllers/paymentController.js";
import authorize from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  authorize,
  createCheckoutSession,
);

router.get("/checkout-session/:sessionId", getCheckoutSession);

export default router;
