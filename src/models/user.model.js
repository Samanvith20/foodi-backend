import mongoose ,{Schema}from "mongoose"
const userSchema= new Schema
(
    {
        name: {
            type:String,
            required:true,
            minlength:5,
            trim:true
        },
        email: {
            type: String,
            trim: true,
            minlength: 3,
            required:true
        },
        photoURL: String,
        role: {
            type: String,
           enum: ['user', 'admin'],
           default: 'user'
        }

},
{timestamps:true})

export const User= mongoose.model("User",userSchema)
