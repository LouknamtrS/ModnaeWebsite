const express = require('express');
const router = express.Router();
const Topic = require("../models/topicModel");
const User = require("../models/User");

router.post("/Topic", async (req, res) => {
 
  try {
    

    const { email, title, descriptions } = req.body;
    const user = await User.findOne({ email:email });
    const newTopic =  new Topic({
      userId: user._id,
      title,
      descriptions,
    });
    await newTopic.save()
    .then(() => res.json(newTopic))
  } catch (err) {
    return res.status(500).send(err);
  }
});


router.route("/ReadTopic").get((req, res) => {
  Topic.find()
    .populate('comments', 'content')
    .then((topics) => {
      console.log(topics);
      res.json(topics);
    })
    .catch((err) => res.json(err));
});

router.post("/Topic/:id/comment", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const topicId = req.params.id;
  const newComment = {
    userId: user._id,
    content: req.body.content,
  };

  Topic.findByIdAndUpdate(
    topicId,
    { $push: { comments: newComment } },
    { new: true } // Return the updated document
  )
    .then((topic) => {
      if (!topic) {
        return res.status(404).json("Topic not found");
      }
      res.json(topic);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route('/Topic/like/:id').post(async (req, res) => {
  try {
    const topicId = req.params.id;
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).send('Topic not found');
    }

    // Toggle ไลก์
    const userIndex = topic.likedBy.indexOf(user._id);
    if (userIndex === -1) {
      // ถ้ายังไม่ไลก์
      topic.likedBy.push(user._id);
      topic.likes += 1;
    } else {
      // อันไลก์
      topic.likedBy.splice(userIndex, 1);
      topic.likes -= 1;
    }
    await topic.save();
    res.json({ likes: topic.likes });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json('Internal Server Error');
  }
});
router.route('/Topic/like-status/:id').get(async (req, res) => {
  try {
    const topicId = req.params.id;
    const email = req.query.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).send('Review not found');
    }

    // เช็คว่าไลก์หรือยัง
    const likedByUser = topic.likedBy.includes(user._id);

    res.json({ likedByUser });
  } catch (error) {
    console.error('Error fetching like status:', error);
    res.status(500).json('Internal Server Error');
  }
});
module.exports = router;
