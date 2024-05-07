import express from "express"
import { createUser, deleteUser, getAdmin, getUser, makeUserAdmin } from "../Controllers/Usercontroller.js"
import { verifyJWT } from "../middlewares/auth_middleware.js"
import { verifyAdmin } from "../middlewares/verify_Admin.js"

 const router= express.Router()

 // declare routes
 router.route("/").get(  verifyJWT,getUser)
 router.route("/create").post(  createUser)
router.route("/delete/:id").delete( verifyJWT,verifyAdmin,deleteUser)
router.route("/admin/:email").get( verifyJWT,verifyAdmin,getAdmin);
router.route("/update/:id").put(verifyJWT,verifyAdmin,makeUserAdmin)

 export default router