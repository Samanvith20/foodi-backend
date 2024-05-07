import { Menu } from "../models/Menu.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";


//get all Menu items
 export const getAllMenuItems=AsyncHandler(async(req,res)=>{
    try {
        const menus = await Menu.find({}).sort({createdAt:-1});
        if(!menus){
            throw  new ApiError(401, "Does not find the MenuItems ")
        }
        res.status(200).json(new ApiResponse(200,menus,"fetched the menuItems Successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500,"Failed to get MenuItems"));
    }
 })


 // to get a single MenuItem
 export const singleMenuItems=AsyncHandler(async(req,res)=>{
     const UserId= req.params.id
     //console.log(UserId);
  try {
       const  SingleMenu= await Menu.findById(UserId)
       if(!SingleMenu){
         throw new  ApiError(401,"Cannot find the menu")
       }
       res.status(200).json(new ApiResponse(200,SingleMenu,"fetched the menuItems Successfully"))
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json(new ApiResponse(500,"Failed to get MenuItem"));
  }
 })

 //delete Items
 export const deleteMenuItem=AsyncHandler(async(req,res)=>{
    const UserId= req.params.id
    //console.log(UserId);
 try {
      const  deleteMenu= await Menu.findByIdAndDelete(UserId)
      if(!deleteMenu){
        throw new  ApiError(401,"Cannot find the menu")
      }
      res.status(200).json(new ApiResponse(200,deleteMenu,"deleted the menuItems Successfully"))
 } catch (error) {
   res.status(500).json(new ApiResponse(500,"Failed to delete MenuItem"));
 }
})

// update the menu

 export const Updatemenu= AsyncHandler(async(req,res)=>{
      const UserId=req.params.id
      console.log(UserId);
      const { name, recipe, image, category, price} = req.body;
      try {
        const updatedMenu = await Menu.findByIdAndUpdate(UserId, 
            { name, recipe, image, category, price}, 
            {new: true, runValidator: true}
            );

        if(!updatedMenu) {
            return res.status(404).json({ message:"Menu not found"})
        }

        res.status(200).json(updatedMenu)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// create a menu
export const createMenuItem = async (req, res) => {
    const newItem = req.body;
    try {
        // Check if the menu item with the same name already exists
        const existingMenuItem = await Menu.findOne({ name: newItem.name });
        if (existingMenuItem) {
            return res.status(400).json({ message: "Menu item with the same name already exists" });
        }
        
        // Create the new menu item if it doesn't already exist
        const result = await Menu.create(newItem);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//upload an image
export const uploadimage= AsyncHandler(async(req,res)=>{
       const file= req.file
      try {
         if(!file){
           throw new ApiError(400," Image is missing")
         }
         // Upload the file to Cloudinary
      const imageUrl = await uploadToCloudinary(file);
       return res.json(new ApiResponse(200,imageUrl, "Image uploaded successfully"))
      } catch (error) {
        console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal server error' });
        
      }
     

})