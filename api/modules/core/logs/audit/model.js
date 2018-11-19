var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZZ_AuditSchema = new Schema({
  object: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  document: Schema.Types.Mixed,
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
  }
});

module.exports = mongoose.model('ZZ_Audit', ZZ_AuditSchema);
