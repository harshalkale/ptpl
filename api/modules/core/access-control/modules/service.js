var ACLModule = require('./acl.module.model.js');

module.exports = {
  get: function(query, callback) {
    if (typeof query.deleted == 'undefined') query.deleted = false;
    ACLModule.find(query)
      .sort({ order: 1 })
      .exec(callback);
  },
  add: function(aclModule, callback) {
    ACLModule.create(aclModule, callback);
  },
  update: function(aclModule, callback) {
    ACLModule.findByIdAndUpdate(aclModule._id, aclModule, callback);
  }
};
