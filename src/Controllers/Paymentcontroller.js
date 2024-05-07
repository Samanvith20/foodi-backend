import AsyncHandler from "../utils/asyncHandler.js";
import { Payment } from "../models/Paymentmodel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { Cart } from "../models/Cart.model.js";

// make a Stripe Payment
export const stripePayment = AsyncHandler(async(req, res) => {
    try {
        const  payments  = req.body;
       
        // Ensure that payments object exists and has cartItems property
        if (!payments || !payments.cartItems) {
            throw new Error("Invalid request: payments or cartItems not found in request body");
        }

        const createPayment = await Payment.create(payments);
        
        // Extract cartItems from payments object
        const cartItems = payments.cartItems;

        // Create an array of ObjectIds from cartItems
        const objectId = mongoose.Types.ObjectId;
        const cartIds = cartItems.map((id) => new objectId(id));

        // Delete cart items
        const deleteCart = await Cart.deleteMany({ _id: { $in: cartIds } });

        res.status(200).json(new ApiResponse(200, createPayment,deleteCart ));
    } catch (error) {
        console.error("Error while creating a payment:", error);
        res.status(500).json(new ApiError(500, "Payment Failed check your details and try again"));
    }
});

// Get Orders  for a Payment using the User Email
export const getAllOrders = AsyncHandler(async (req, res) => {
    const email = req.query.email;
    // console.log(email);
    const decodedemail = req.decoded.email;
    
    if (email !== decodedemail) {
      throw new ApiError(401, "Unauthorized request");
    }
    const query = { email: email };
   
    try {
      const getOrderDetails = await Payment.find(query).sort({ createdAt: -1 });
     
      res.status(201).json(new ApiResponse(201, "Order Details fetched Successfully", getOrderDetails));
    } catch (error) {
      console.error("Error while fetching order details :", error);
      res.status(500).json(new ApiError(500, "Order Failed check your details and try again"));
    }
  });

  // Get all Orders
  export const GetAllPayments = AsyncHandler(async (req, res) => {
    try {
      const AllPayments = await Payment.find({}).sort({ createdAt: -1 }).exec();
      if (!AllPayments || AllPayments.length === 0) { // Check if AllPayments is empty
        throw new ApiError(400, "Unable to find all Payments");
      }
      res.status(200).json(new ApiResponse(200,AllPayments, "Fetched All Payments Information Successfully"));
    } catch (error) {
      console.error("Error while fetching All Payment details:", error);
      res.status(500).json(new ApiError(500, "Failed to fetch payments. Please check your details and try again."));
    }
  });
  
  //Update Payemnt( Conform Payment)
  
  export const UpdatePayment= AsyncHandler(async(req,res)=>{

        const PayId= req.params.id
        // console.log(PayId);
       const {status}= req.body 
      //  console.log(status);
      
        try {
           
           const paymentInfo= await Payment.findByIdAndUpdate(PayId,{status:"confirmed"}
           ,
           {
           new: true, runValidators: true
           })
           if(!paymentInfo){
            throw new ApiError(404,"Cannot find the PaymentInformation")
           }
            res.status(201).json(new ApiResponse(201,paymentInfo,"Payment updated Successfully"))
        } catch (error) {
          res.status(500).json(new ApiError(500,"Updating the Payment was failed"));
        }
      })

      //delete the Order
      export const deletePayment=AsyncHandler(async(req,res)=>{
         const payId=req.params.id
         try {
             const deleteOrder= await Payment.findByIdAndDelete(payId)
             if(!deleteOrder){
               throw new ApiError(400,"Payment was not deleted Successfully")
             }
             res.send(200).json(new ApiResponse(200,deleteOrder,"Order was deleted Successfully"))
         } catch (error) {
          res.status(500).json(new ApiError(500,"Deleting the Payment was failed"));
         }
      })