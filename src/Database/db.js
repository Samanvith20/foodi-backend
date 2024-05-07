import mongoose from "mongoose"
const ConnectDb= async ()=>{
  try {
    if (mongoose.connection.readyState !== 0) return; // Already connected
    const db = await mongoose.connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Foodie'
  });
  
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}
 export default ConnectDb