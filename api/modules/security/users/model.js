var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_UserSchema = new Schema({
  auth: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'TXN_Role',
    default: null
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

TXN_UserSchema.index({
  'auth.username': 1,
  _id: 1
});

module.exports = mongoose.model('TXN_User', TXN_UserSchema);
