var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MST_ACL_ActionSchema = new Schema({
  object: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    type: Number,
    required: true
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: 'MST_ACL_Module'
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'MST_ACL_Page'
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  actionType: {
    type: String,
    enum: ['view', 'add', 'update', 'delete']
  },
  exclusive: {
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
      ref: 'TXN_User'
    },
    at: {
      type: Date,
      default: Date.now
    }
  },
  updated: {
    by: {
      type: Schema.Types.ObjectId,
      ref: 'TXN_User'
    },
    at: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = mongoose.model('MST_ACL_Action', MST_ACL_ActionSchema);
