const express = require('express');
const router = express.Router();
const Review = require("../models/writeReviewModel");
const User = require("../models/User");

// Route to get reviews
router.route("/ReadReview").get(async (req, res) => {
  const subject = req.query.subject;
  try {
    let reviews;
    if (subject) {
      reviews = await Review.find({ subject }).populate('userId');
    } else {
      reviews = await Review.find().populate('userId');
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route('/Readreview/like/:reviewId').post(async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).send('Review not found');
    }

    // Toggle ไลก์
    const userIndex = review.likedBy.indexOf(user._id);
    if (userIndex === -1) {
      // ถ้ายังไม่ไลก์
      review.likedBy.push(user._id);
      review.likes += 1;
    } else {
      // อันไลก์
      review.likedBy.splice(userIndex, 1);
      review.likes -= 1;
    }
    await review.save();
    res.json({ likes: review.likes });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json('Internal Server Error');
  }
});
router.route('/Readreview/like-status/:reviewId').get(async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const email = req.query.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).send('Review not found');
    }

    // เช็คว่าไลก์หรือยัง
    const likedByUser = review.likedBy.includes(user._id);

    res.json({ likedByUser });
  } catch (error) {
    console.error('Error fetching like status:', error);
    res.status(500).json('Internal Server Error');
  }
});
module.exports = router;
