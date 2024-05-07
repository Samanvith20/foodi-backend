import express from "express"
import {  GetAllPayments, UpdatePayment, deletePayment, getAllOrders, stripePayment } from "../Controllers/Paymentcontroller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = express.Router();
router.route("/").post( verifyJWT,stripePayment)
router.route("/orders").get(verifyJWT, getAllOrders)
router.route("/all").get(verifyJWT,GetAllPayments)
router.route("/:id").put(UpdatePayment)
router.route("/:id").delete(deletePayment)
 export default router