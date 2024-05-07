import express from "express"
import { Updatemenu, createMenuItem, deleteMenuItem, getAllMenuItems, singleMenuItems, uploadimage } from "../Controllers/Menucontroller.js"
import { upload } from "../middlewares/multer_middleware.js"
import { ApiResponse } from "../utils/apiResponse.js"
const router= express.Router()

// declare the routes
 router.route("/").get(getAllMenuItems)
 router.route("/create").post(createMenuItem)
 router.route("/update/:id").put(Updatemenu)
 router.route("/delete/:id").delete(deleteMenuItem)
 router.route("/:id").get(singleMenuItems)
 router.route("/upload").post(upload.single("image"),uploadimage)


  export default router