// @ts-check
import rpn from 'request-promise-native';

// Change naming convention from payload to params
function apiCaller({ method = 'GET', params = null, url = '' }) {
  let options = {
    uri: url,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  if (method) {
    options = { ...options, method };
    if (params) options = { ...options, body: params };
  }

  return rpn(options)
    .then(resp => resp)
    .catch(error => error);
}

export default apiCaller;
