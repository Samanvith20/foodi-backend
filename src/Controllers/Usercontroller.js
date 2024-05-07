import { User } from "../models/user.model.js";
import AsyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


// to get Userdetails
export const getUser =  AsyncHandler( async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json(new ApiError(404, null, "No user found"));
        }
        return res.status(200).json(new ApiResponse(200, users, "User details found successfully"));
    } catch (error) {
       
        console.error("Error while fetching user details:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});

// create a new user
export const createUser = AsyncHandler(async(req, res) => {
    const user = req.body;
    if (!user || !user.email) {
        throw new ApiError(400,"fields are required")
    }
    const query = { email: user.email };
    try {
        const existingUser = await User.findOne(query);
        if (existingUser) {
            return res.status(302).json(new ApiError(302, existingUser, "User already exists"));
        }
        const result = await User.create(user);
        res.status(201).json(new ApiResponse(201, result, "User created successfully"));
    } catch (error) {
        console.error("Error while creating a user:", error);
        res.status(500).json(new ApiError(500, "Internal server error"));
    }
});


// delete a user
export const deleteUser= AsyncHandler(async(req,res)=>{
     const id= req.params.id.trim()
     try {
        const deletedUser = await User.findByIdAndDelete(id);
        // if user not found
        if(!deletedUser){
            return res.status(404).json(new ApiError(404, "User not found!" ));
        }
        res.status(200).json(new ApiResponse(200,deleteUser,"User deleted successfully!") )
     } catch (error) {
        console.error("Error while deleting a User:",error)
        res.status(500).json(new ApiError(500,"Internal server error"))
     }
})


// get admin detail
export const getAdmin = AsyncHandler(async (req, res) => {
    const email = req.decoded.email;
    const query = { email: email };
    try {
        const user = await User.findOne(query);
        //console.log(user);
        if (!user) {
             throw new ApiError(401,"user details not found")
        }
        if (email !== req.decoded.email) {
            return res.status(403).json(new ApiError(403, "Forbidden access"));
        }
        let admin = false;
        if(user ){
            admin = user?.role === "admin";
        }
        res.status(200).json(new ApiResponse(200, admin, "Admin details found successfully"));
    } catch (error) {
        console.error("Error while finding an admin:", error);
        res.status(500).json(new ApiError(500, "Internal server error"));
    }
});

// Make admin for a user
export const makeUserAdmin = AsyncHandler(async (req, res) => {
    const userId = req.params.id.trim();
    console.log(userId);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: "admin" },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
    } catch (error) {
        console.error("Error while updating a user:", error);
        res.status(500).json(new ApiError(500, "Internal server error"));
    }
});


 