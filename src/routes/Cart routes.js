import express from "express"
import { deleteCart,updateCart,addToCart,getCartByEmail,getSingleCart } from "../Controllers/Cartcontroller.js";
const router = express.Router();
router.route("/email").get(getCartByEmail)
router.route("/add").post(addToCart)
router.route("/:id").delete(deleteCart)
router.route("/:id").put(updateCart)
router.route("/:id").get(getSingleCart)
export default router