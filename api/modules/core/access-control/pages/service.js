var ACLPage = require('./acl.page.model.js');

module.exports = {
  get: function(query, callback) {
    if (typeof query.deleted == 'undefined') query.deleted = false;
    ACLPage.find(query)
      .populate({
        path: 'module',
        match: {
          active: true,
          deleted: false
        }
      })
      .sort({ 'module.order': 1, order: 1 })
      .exec(callback);
  },
  add: function(aclPage, callback) {
    ACLPage.create(aclPage, callback);
  },
  update: function(aclPage, callback) {
    ACLPage.findByIdAndUpdate(aclPage._id, aclPage, callback);
  }
};
