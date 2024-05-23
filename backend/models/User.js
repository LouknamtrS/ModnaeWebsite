const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        firstname:{
            type: String,
        },
        lastname:{
            type: String
        },
        email: {
            type: String,
        },
        password:{
            type: String,
        },
        role:{
            type: String,
            default: 'user'
        },
        verify:{
        type: Boolean,
        default: false,
        }, 
    },
    {timestamps: true}
);

module.exports = User = mongoose.model("user",UserSchema);