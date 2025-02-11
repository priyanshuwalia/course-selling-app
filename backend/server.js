const express = require('express');
const connectDB = require("./database");
connectDB();

const port =3000;
const app = express();
app.use(express.json());

const authRoutes= require("./routes/authRoutes");
const courseRoutes= require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");



app.get("/", (req,res)=>{
    res.send('this end is working')
});

app.use("/api/auth", authRoutes);
app.use("use/courses", courseRoutes);
app.use("/api/admin", adminRoutes);



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})