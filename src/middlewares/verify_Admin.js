import { User } from "../models/user.model.js";

 export const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query ={email: email};

    const user = await User.findOne(query);
    //console.log(user);
    const isAdmin = user?.role == 'admin';

    if(!isAdmin){
       res.status(401).send({message:"User is not an admin"})
    }

    next();
};

