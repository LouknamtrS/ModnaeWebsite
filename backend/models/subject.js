const mongoose = require('mongoose');


const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});


subjectSchema.index({ name: 'text' });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;