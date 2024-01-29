import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercasr: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercasr: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        lowercasr: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,    //Cloudinary url
        required: true
    },
    coverimage: {
        type: String    //Cloudinary url
    },
    watchhistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    passowrd: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("passowrd")) {
        this.passowrd = await bcrypt.hash(this.passowrd, 10)
        next()
    }
    else {
        return next()
    }
})

userSchema.methods.isPasswordCorrect = async function (passowrd) {
    return await bcrypt.compare(passowrd, this.passowrd)
}
userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIREY
        }
    )
}
userSchema.methods.generaterefreshToken = function () {
    wt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIREY
        }
    )
}

export const User = mongoose.model("User", userSchema)