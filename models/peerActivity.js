const mongoose = require('mongoose')

const peerActivitySchema = new mongoose.Schema({
  peerAssignment_id: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  reviewer_id: {
    type: String,
    required: true,
  },
  review_score: {
    type: Array,
    "default": []
  },
  reviewer_comment: {
    type: Array,
    "default": []
  },
  material_drive_link: {
    type: String,
    required: true,
  },
  final_grade: {
    type: Number,
  },
  time_stamp: {
    type: String,
    required: false,
  },
})

const peerActivity = mongoose.model('peerActivity', peerActivitySchema)
module.exports = peerActivity
