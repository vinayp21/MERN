'use strict';

var apiResponse = {
  generate: function generate() {
    var jsonResponse = {
      err: arguments.length <= 0 ? undefined : arguments[0]
    },
        data = arguments.length <= 1 ? undefined : arguments[1];
    if (typeof data === 'string') {
      jsonResponse.msg = data;
    } else {
      if (data) {
        jsonResponse.data = data;
      }
    }
    return jsonResponse;
  }
};

module.exports = apiResponse;