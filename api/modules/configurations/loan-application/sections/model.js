var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_SectionSchema = new Schema({
  sequenceNo: Number,
  // prefix: String,
  name: {
    type: String,
    required: true
  },
  loanApplicationTypes: [{
    type: Schema.Types.ObjectId,
    ref: 'TXN_LoanApplicationType'
  }],
  active: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  created: {
    by: {
      type: Schema.Types.ObjectId,
      ref: 'TXN_User',
      default: null
    },
    at: {
      type: Date,
      default: Date.now
    }
  },
  updated: {
    by: {
      type: Schema.Types.ObjectId,
      ref: 'TXN_User',
      default: null
    },
    at: {
      type: Date,
      default: Date.now
    }
  }
});

TXN_SectionSchema.index({
  sequenceNo: 1,
  name: 1,
  _id: 1
});

module.exports = mongoose.model('TXN_Section', TXN_SectionSchema);
