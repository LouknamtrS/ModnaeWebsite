const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const topicSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user", 
  },
  title: {
    type: String, 
  },
  descriptions: { type: String },
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
}, { timestamps: true });


const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;