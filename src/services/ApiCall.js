import fetch from 'isomorphic-unfetch';
function _post(url, headers, data) {
  const options = { method: 'POST', headers: headers.headers, body: JSON.stringify(data) }
  return fetch(url, options).then(r => { return r.json() })
}

function _get(url, headers) {
  const options = { method: 'GET', headers: headers.headers }
  return fetch(url, options).then(r => { return r.json() })
}

function _do_call(type, url, headers = {}, data = {}) {
  url = url;
  switch (type) {
    case 'POST': return _post(url, headers, data);
    case 'GET': return _get(url, headers);
    case 'PUT': break;
  }
}

const HttpCalls = { _do_call, _post, _get };

export default HttpCalls;