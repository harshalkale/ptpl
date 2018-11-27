var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoresSchema = new Schema({
  loanApplicationType: {
    type: Schema.Types.ObjectId,
    ref: 'TXN_LoanApplicationType'
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = new Schema({
  text: {
    type: String,
    required: true
  },
  scores: [ScoresSchema]
}).post('init', doc => {
  if (!doc._id) doc._id = mongoose.Types.ObjectId();
  return doc;
});
