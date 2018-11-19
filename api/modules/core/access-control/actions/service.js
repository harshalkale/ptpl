var ACLAction = require('./acl.action.model.js');

module.exports = {
  get: function(query, callback) {
    if (typeof query.deleted == 'undefined') query.deleted = false;
    ACLAction.find(query)
      .populate({
        path: 'module',
        match: {
          active: true,
          deleted: false
        }
      })
      .populate({
        path: 'page',
        match: {
          active: true,
          deleted: false
        }
      })
      .sort({
        'module.order': 1,
        'page.order': 1,
        order: 1
      })
      .exec(callback);
  },
  add: function(aclAction, callback) {
    ACLAction.create(aclAction, callback);
  },
  update: function(aclAction, callback) {
    ACLAction.findByIdAndUpdate(aclAction._id, aclAction, callback);
  }
};
