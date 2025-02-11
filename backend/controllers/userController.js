const User = require("../models/User");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kvjdsd52"
const { validationResult } = require('express-validator');


const signUp = async (req, res)=>{
    try {
        const{name, email, password}= req.body;
        
        const userExists = await  User.findOne({email});
        if (userExists) return res.status(400).json({message: "User already Exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({message: "User created Successfully"})
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const sigIn = async (req,res)=>{

    try {

        const  errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password}= req.body;

        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "Invalid Username or Password"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id}, JWT_SECRET, {
            expiresIn: '1h' ,
        })
       
        res.status(200).json({ message: 'Login successful', token });

    }
    catch(err) {

        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const seeProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token payload
        // Fetch user details from database (Assuming you have a User model)
        const user = await User.findById(userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Profile retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {signUp, sigIn, updateUser, seeProfile};

