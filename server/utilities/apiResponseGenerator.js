let apiResponse = {
  generate: (...args) => {
    let jsonResponse = {
        err: args[0]
      },
      data = args[1];
    if (typeof data === 'string') {
      jsonResponse.msg = data;
    } else {
      if(data){
        jsonResponse.data = data;
      }
    }
    return jsonResponse;
  }
}

module.exports = apiResponse;
