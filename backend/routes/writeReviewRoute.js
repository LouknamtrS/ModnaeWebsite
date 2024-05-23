const express = require('express');
const router = express.Router();
const ReadReview = require("../models/writeReviewModel");
const User = require("../models/User")

router.post("/WriteReview",async(req, res) => {
    try{
        console.log(req.body);
        const {email,subject,year,teacher,descriptions} = req.body;
        const user = await User.findOne({email:email})
        const newReview = new ReadReview({
            userId: user._id,
            subject,
            year,
            teacher,
            descriptions,
            // timestamps: req.body.timestamps,
    });
        await newReview.save()
        .then(() => res.json(newReview))
    }catch (err) {
        return res.status(500).send(err);
      }
});

module.exports = router;