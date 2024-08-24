import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},
    isAdmin: {type: Boolean, required: true},
    isVendor: {type: Boolean, required: true}
}, {timestamps: true})

export let User = mongoose.model('User', userSchema)