//@ts-check

import rpn from "request-promise-native";

function apiCaller({ method = "GET", payload = null, url = "" }) {
  let options = {
    uri: url,
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true
  };

  if (method) {
    options = { ...options, method };
    if (payload) options = { ...options, body: payload };
  }

  return rpn(options)
    .then(resp => resp)
    .catch(error => error);
}

export default apiCaller;
