const mongoose= require("mongoose");

const connectDB= async ()=>{
    try {
        await mongoose.connect("mongodb+srv://waliapriyanshu07:Applebottomjeans@cluster0.upmly.mongodb.net/", {
        })
        console.log("MongoDB connected")
    }
    catch (err){
        console.error("Error Connecting to DB", err)
        process.exit(1);
    }
}
module.exports = connectDB;