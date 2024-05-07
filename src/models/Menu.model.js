import mongoose,{Schema} from "mongoose";

// create schema object for Menu Items
const menuSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String, 
    category: String,
    price: Number,
   

},
{timestamps:true})

// create model
 export const Menu = mongoose.model("Menu", menuSchema);
