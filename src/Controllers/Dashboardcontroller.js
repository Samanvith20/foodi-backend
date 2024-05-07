
import { Menu } from "../models/Menu.model.js";
import { User } from "../models/user.model.js";
import { Payment } from "../models/Paymentmodel.js";

import AsyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const Dashboardlayout = AsyncHandler(async (req, res) => {
    try {
        //countDocuments() is used to retrieve the count of documents in different MongoDB collections.
        const user = await User.countDocuments();
        const menuItems = await Menu.countDocuments();
        const Orders = await Payment.countDocuments();
        //  aggregate() is used to perform more complex operations on the data, 
        const paymentPrice = await Payment.aggregate([{
            $group: {
                _id: null,  // means grouping all documents together
                totalRevenue: {
                    $sum: "$price"   // calculate the sum of a specified field 
                }
            }
        }]);
        const revenue = paymentPrice.length > 0 ? paymentPrice[0].totalRevenue : 0; 
        res.status(200).json({user,menuItems,Orders,revenue})
    } catch (error) {
        res.status(500).json(new ApiError(500, "Unable to find the dashboard information"));
    }
});

// This endpoint fetches dashboard statistics related to menu items
export const dashboardstats = AsyncHandler(async (req, res) => {
    try {
        // Aggregate pipeline to compute statistics
        const result = await Payment.aggregate([
            // Unwind the 'menuItems' array to deconstruct it into separate documents
            {
                $unwind: "$menuItems"
            },
            // Perform a lookup to fetch details from the 'menus' collection based on 'menuItems'
            {
                $lookup: {
                    from: "menus",
                    localField: "menuItems",
                    foreignField: "_id",
                    as: "menuItemDetails"
                }
            },
            // Unwind the 'menuItemDetails' array to deconstruct it into separate documents
            {
                $unwind: "$menuItemDetails"
            },
            // Group the documents by the category of the menu item
            {
                $group: {
                    _id: '$menuItemDetails.category',
                    quantity: { $sum: '$quantity' }, // Compute total quantity sold
                    revenue: { $sum: '$price' } // Compute total revenue generated
                }
            },
            // Project the grouped fields to desired format
            {
                $project: {
                    _id: 0, 
                    category: "$_id", // Rename _id to category
                    quantity: "$quantity",
                    revenue: "$revenue"
                }
            }
        ]);

        
        res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      
        res.status(500).json(new ApiError(500, "Unable to find the dashboardstats information"));
    }
});
