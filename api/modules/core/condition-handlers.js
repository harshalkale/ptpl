var util = require('util');
RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
module.exports = {
    myStringHandler: function(field, search) {
        var value = [];
        search.forEach(function(chunk) {
            if (util.isRegExp(chunk)) {
                value.push(chunk);
            } else {
                value.push(new RegExp(RegExp.escape(chunk.trim()), 'i'));
            }
        });
        return value.length == 0 ? undefined : { $in: value };
    },
    myBooleanHandler: function(field, search) {
        var value;
        search.forEach(function(chunk) {
            if (/^true$/i.test(chunk)) {
                value = true;
            } else if (/^false$/i.test(chunk)) {
                value = value || false;
            }
        });
        return value == undefined ? undefined : { $in: [value] };
    }
};
