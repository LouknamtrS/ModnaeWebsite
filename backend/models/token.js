const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
{
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"user",
        unuiqe: true,

    },
    tokens:{type:String, require: true},
    createAt:{type:Date, default:Date.now(),expires:86400} //1hours
}
);

module.exports = Token = mongoose.model("tokens",tokenSchema);