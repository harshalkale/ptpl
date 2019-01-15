var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_LoanApplicationSchema = new Schema({
  applicationId: {
    type: String,
    required: true
  },
  loanApplicationType: {
    type: Schema.Types.ObjectId,
    ref: 'TXN_LoanApplicationType',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  coApplicant: {
    type: Boolean,
    default: false
  },
  coApplicantFirstName: String,
  coApplicantMiddleName: String,
  coApplicantLastName: String,
  formData: {
    type: Schema.Types.Mixed,
    required: true
  },
  coApplicantFormData: {
    type: Schema.Types.Mixed
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

TXN_LoanApplicationSchema.index({
  applicationId: 1,
  _id: 1
});

module.exports = mongoose.model(
  'TXN_LoanApplication',
  TXN_LoanApplicationSchema
);
