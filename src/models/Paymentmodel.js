import mongoose ,{Schema}from "mongoose"
 const paymentSchema=new Schema(
    {
        email: {
            type: String,
            
        },
        transitionId: {
            type: String,
            
        },
        price: {
            type: Number,
            
        },
        quantity: {
            type: Number,
            
        },
        status: {
            type: String,
            enum: ['order-pending', 'order-completed', 'order-cancelled','confirmed'], 
            
        },
        itemName: Array,
        cartItems: Array,
        menuItems: Array
    },
    {timestamps:true})
     export const Payment=mongoose.model("Payment",paymentSchema)