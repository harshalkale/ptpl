var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TXN_UserAccessLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'TXN_User'
  },
  action: {
    type: String,
    uppercase: true,
    enum: ['LOGIN', 'LOGOUT']
  },
  at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TXN_UserAccessLog', TXN_UserAccessLogSchema);
