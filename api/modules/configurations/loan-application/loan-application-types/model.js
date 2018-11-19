var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_LoanApplicationTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
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

TXN_LoanApplicationTypeSchema.index({ name: 1, _id: 1 });

module.exports = mongoose.model(
  'TXN_LoanApplicationType',
  TXN_LoanApplicationTypeSchema
);
