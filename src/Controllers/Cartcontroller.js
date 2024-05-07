import { Cart } from "../models/Cart.model.js";
import AsyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// get Cart using email
 export const getCartByEmail = AsyncHandler(async(req, res) => {
    try {
        const email = req.query.email;
        // console.log(email);
        if(!email){
            throw new ApiError("Email is Invalid(or)not exits")
        }
        const query = {email: email};
        const result = await Cart.find(query).exec();
        return res.status(200).json(new ApiResponse(200, result))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Invalid Email"));
    }
})
  // post a cart when add-to-cart btn clicked 
   export const addToCart = AsyncHandler(async(req, res) => {
    const {menuItemId, name, recipe, image, price, quantity,email } = req.body;
    if(!menuItemId||!name||!email){
           throw new ApiError("All fields are required")
    }
    try {
        // exiting menu item
        const existingCartItem = await Cart.findOne({menuItemId});
        if(existingCartItem){
            return res.status(400).json(new ApiResponse(400,"Item is already exist in the cart"));
        }

        const cartItem = await Cart.create({
            menuItemId, name, recipe, image, price, quantity,email 
        })

        res.status(201).json(new ApiResponse(201,cartItem,"Item added Successfully"))

    } catch (error) {
        res.status(500).json(new ApiError(500,"Add to cart is Failed"));
    }
})

// delete a cart item
  export const deleteCart =  AsyncHandler (async(req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json(new ApiResponse(401,"Cart Items not found!"))
        }
        res.status(200).json(new ApiResponse(200, deleteCart,"Cart Item Deleted Successfully!"))

    } catch (error) {
        res.status(500).json(new ApiError(500,"Cart Item delteing Failed"));
    }
})

// updata a cart item
 export const updateCart = AsyncHandler (async(req, res) => {
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity,email } = req.body;

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId, {menuItemId, name, recipe, image, price, quantity,email }, {
                new: true, runValidators: true
            }
        )
        if(!updatedCart){
            return res.status(404).json({ message: "Cart Item not found"})
        }
        res.status(200).json(new ApiError(200, updateCart,"Cart item was Updated Successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Updating the cart was failed"));
    }
})

// get single recipe
 export const getSingleCart = AsyncHandler (async(req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Cart.findById(cartId)
        res.status(200).json(new ApiResponse(200,cartItem,"Item Fetched Successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Failed for fetching the Item details"));
    }
})