var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MST_ACL_ModuleSchema = new Schema({
  object: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
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

module.exports = mongoose.model('MST_ACL_Module', MST_ACL_ModuleSchema);
