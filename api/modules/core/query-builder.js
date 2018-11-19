module.exports = {
/**
 * Build a JSON object from the request object's body or query parameters
 */
  buildQuery: function(req) {
    var query = {};
    // Check if there is data in the query parameters
    if (req.query) {
      // check to see if there is an 'id' passed
      if (req.query.id) {
        // map it to mongodb's '_id' property
        query._id = req.query.id;
        // remove the existing 'id'
        delete req.query.id;
      }
      // for every other property, evaluate it and map it in the JSON object
      for (var i in req.query) {
        if (req.query[i]) query[i] = evaluate(req.query[i]);
        else query[i] = req.query[i];
      }
    }
    // do all the above if there is data in the body of the request
    if (req.body) {
      if (req.body.id) {
        query._id = req.body.id;
        delete req.body.id;
      }
      for (var i in req.body) {
        if (req.body[i]) query[i] = evaluate(req.body[i]);
        else query[i] = req.body[i];
      }
    }
    // if there is an array of ids passed, map it to the mongodb's query equivalent
    if (query._id && query._id.constructor === Array) {
      query._id = {
        $in: query._id
      };
    }
    // return the JSON object that was built
    return query;
  }
};

/**
 * Evaluate the type of object and return a mongodb query equivalent value
 * @param {object} object The object to evaluate
 */
function evaluate(object) {
  // check if the object is an array
  if (object && object.constructor === Array) {
    for (var i = 0; i < object.length; i++) {
      // recurrsively evaluate each array item
      object[i] = evaluate(object[i]);
    }
  }
  // check if the object has any keys
  else if (
    object &&
    typeof object == 'object' &&
    Object.keys(object).length > 0
  ) {
    // check to see if there is no '_eval' key
    if (Object.keys(object).indexOf('_eval') < 0) {
      for (var key in object) {
        // recursively evaluate each item for a key
        object[key] = evaluate(object[key]);
      }
    }
    // evaluate the '_eval' key
    else
      switch (object['_eval']) {
        // if there is a regular expression, map the Regex value
        // also escape any special characters present
        case 'regex': {
          object = new RegExp(RegExp.escape(object['value']), 'i');
          break;
        }
        // if the regex does not want to be escaped, do the following
        case 'regexNoEsc': {
          object = new RegExp(object['value'], 'i');
          break;
        }
      }
  }
  return object;
}
