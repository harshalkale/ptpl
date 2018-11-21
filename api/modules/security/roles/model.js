var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  canModify: {
    type: Boolean,
    default: false
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

TXN_RoleSchema.index({
  name: 1,
  _id: 1
});

module.exports = mongoose.model('TXN_Role', TXN_RoleSchema);
