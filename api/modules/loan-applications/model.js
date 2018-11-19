var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_LoanApplicationSchema = new Schema({
  loanApplicationNo: {
    type: String,
    required: true
  },
  applicationType: {
    type: String,
    required: true
  },
  applicantData: {
    title: {
      type: String,
      required: true,
      uppercase: true,
      enum: ['MR.', 'MRS.', 'MS.']
    },
    first: {
      type: String,
      required: true,
      uppercase: true
    },
    middle: {
      type: String,
      uppercase: true
    },
    last: {
      type: String,
      required: true,
      uppercase: true
    }
  },
  otherData: mongoose.SchemaTypes.Mixed,
  score: Number,
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

TXN_LoanApplicationSchema.index({ name: 1, _id: 1 });

module.exports = mongoose.model(
  'TXN_LoanApplication',
  TXN_LoanApplicationSchema
);
