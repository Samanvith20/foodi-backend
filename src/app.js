import express from "express"
import cors from "cors"; 
import cookieParser from "cookie-parser"; 
 const app= express();

 

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import cartRouter from "../src/routes/Cart routes.js"
import userRouter from "../src/routes/User route.js"
import menuRouter from "../src/routes/Menu.routes.js"
import  paymentRouter from "../src/routes/Payment routes.js"
import DashboardRoute from "../src/routes/Dashboard.route.js"

//Declare route
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/menu",menuRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/dashboard",DashboardRoute)

 export default app