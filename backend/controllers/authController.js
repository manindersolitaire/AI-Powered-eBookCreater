import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'


const generateToken = (id) => {
    return jwt.sign(
        { _id: id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || password == null || password === "") {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        if (typeof password !== "string") {
            return res.status(400).json({
                message: "Password must be a string"
            });
        }

        const userExists = await UserModel.findOne({
            email: email.toLowerCase()
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await UserModel.create({
            name,
            email,
            password
        });

        return res.status(201).json({
            message: "User registered successfully",
            token: generateToken(user._id)
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const loginUser = async(req,res)=>{
    try {
        const {email , password} = req.body
    } catch (error) {
        res.status(500).json({message : "Server error"})
    }
}



