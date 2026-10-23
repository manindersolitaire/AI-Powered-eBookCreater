import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required: true,
        // minlength : 6,
        // select : false
    },
    avatar : {
        type : String,
        default : ""
    },
    isPro : {
        type : Boolean,
        default : false,
    }
}, {timestamps : true})

// Password hashing middleware
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(
        String(this.password),
        10
    );
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(
        String(enteredPassword),
        this.password
    );
};

const UserModel = mongoose.model('User', userSchema)
export default UserModel
