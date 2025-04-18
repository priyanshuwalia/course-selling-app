// const User = require("../models/User");
// const Course = require('../models/Course');
// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = "kvjdsd52"
// const { validationResult } = require('express-validator');


// const signUp = async (req, res)=>{
//     try {
//         const{name, email, password}= req.body;
        
//         const userExists = await  User.findOne({email});
//         if (userExists) return res.status(400).json({message: "User already Exists"});

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({message: "User created Successfully"})
//     }
//     catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// }

// const updateUser = async (req, res) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// const sigIn = async (req,res)=>{

//     try {

//         const  errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const {email, password}= req.body;

//         const user = await User.findOne({email})
//         if (!user) {
//             return res.status(401).json({message: "Invalid Username or Password"})
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ id: user._id}, JWT_SECRET, {
//             expiresIn: '1h' ,
//         })
       
//         res.status(200).json({ message: 'Login successful', token, role: user.role });

//     }
//     catch(err) {

//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// }
// const seeProfile = async (req, res) => {
//     try {
//         const userId = req.user.id; 
        
//         const user = await User.findById(userId).select("-password"); 

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.json({ message: "Profile retrieved successfully", user });
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



//  const purchaseCourse = async (req, res) => {
//     try {
//         const { userId, courseId } = req.params;

        
//         if (req.user._id.toString() !== userId) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }

        
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }

        
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

        
//         if (user.purchasedCourses.includes(courseId)) {
//             return res.status(400).json({ message: 'Course already purchased' });
//         }

        
//         user.purchasedCourses.push(courseId);
//         await user.save();

//         res.status(200).json({ message: 'Course purchased successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };
//  const getPurchasedCourses = async (req, res) => {
//     try {
//         const { userId } = req.params;

        
//         const user = await User.findById(userId).populate('purchasedCourses');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ purchasedCourses: user.purchasedCourses });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };



// module.exports = {signUp, sigIn, updateUser, seeProfile, purchaseCourse, getPurchasedCourses};

const User= require("../models/User");
const Course = require("../models/Course");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kvjdsd52";


const Signup = async(req,res)=>{
    try {
        const {name,email, password} = req.body;
        const UserExists= await User.findOne({email});
        if (UserExists) return res.status(400).json({message: "User already Exists"});
    }
    catch
        (error) {
         res.status(500).json({ message: "Server error", error });
    }
}
