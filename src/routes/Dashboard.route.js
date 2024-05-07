import express from "express"
import { Dashboardlayout, dashboardstats } from "../Controllers/Dashboardcontroller.js"
const router= express.Router()
router.route("/").get(Dashboardlayout)
router.route("/status").get(dashboardstats)
 export default router