const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  subject: { type: String },
  year: { type: String },
  teacher: { type: String },
  descriptions: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
