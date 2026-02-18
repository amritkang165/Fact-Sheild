const mongoose = require('mongoose');

const supportingArticleSchema = new mongoose.Schema({
  title: String,
  source: String,
  url: String,
});

const checkSchema = new mongoose.Schema(
  {
    url: String,
    title: String,
    domain: String,
    risk: Number,
    label: String,
    reasons: [String],
    supportingArticles: [supportingArticleSchema],
  },
  { timestamps: true } // adds createdAt
);

module.exports = mongoose.model('Check', checkSchema);
