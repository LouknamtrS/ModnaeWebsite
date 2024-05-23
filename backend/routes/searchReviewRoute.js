const express = require('express');
const router = express.Router();
const Subject = require("../models/subject.js");

router.post('/Search', async (req, res) => {
  const { searchSubject } = req.body;
  try {
    const results = await Subject.find(
      { name: { $regex: searchSubject, $options: 'i' } }, // เงื่อนไขการค้นหา
      { name: 1, _id: 0 } // Projection: เลือกให้แสดงเฉพาะ attribute name เท่านั้น
    );
    res.json(results);
  } catch (error) {
    console.error('Error searching Subjects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
