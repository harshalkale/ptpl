var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZZ_ExceptionSchema = new Schema({
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
    exception: Schema.Types.Mixed,
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

module.exports = mongoose.model('ZZ_Exception', ZZ_ExceptionSchema);
