import dotenv from "dotenv";
import app from "./app.js";
import ConnectDb from "./Database/db.js"; 
import jwt from "jsonwebtoken";
import stripe from "stripe";

dotenv.config({
    path: "./env"
});

app.get("/",(req,res)=>{
    res.send("Hello Foodi-Backend")
})

//Stripe 
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY)
app.post("/create-payment-intent", async (req, res) => {
    const { price,} = req.body;

 // Convert price to the smallest currency unit (paise)
 const amountInPaise = price * 1400;


    //  console.log(req.body);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amountInPaise,
      currency: "inr",
       "payment_method_types": [ "card"],
       
    });
  
    res.send({

      clientSecret: paymentIntent.client_secret,
     
    });
})
 // jwt authentication
 app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    res.send({token});
  })

ConnectDb()
    .then(() => {
        app.listen(process.env.PORT || 6000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGO db connection failed !!! ", error);
    });

 


