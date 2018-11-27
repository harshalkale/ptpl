var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptionsSchema = require('./options.schema');

var TXN_FieldSchema = new Schema({
  sequenceNo: Number,
  label: {
    type: String,
    required: true
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: 'TXN_Section'
  },
  loanApplicationTypes: [{
    type: Schema.Types.ObjectId,
    ref: 'TXN_LoanApplicationType'
  }],
  options: [OptionsSchema],
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

TXN_FieldSchema.index({
  sequenceNo: 1,
  label: 1,
  _id: 1
});

module.exports = mongoose.model('TXN_Field', TXN_FieldSchema);
