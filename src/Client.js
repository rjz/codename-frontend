import EventEmitter from 'events';

require('whatwg-fetch');

const SERVER_ERROR_STRING = 'Server unavailable';

function apiError (status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
}

function onAPIResponse (res) {
  if (res.status >= 500) {
    return Promise.reject(apiError(res.status, SERVER_ERROR_STRING));
  }

  return res.json().then((json) => {
    if (res.status >= 400) {
      return Promise.reject(apiError(res.status, json.message));
    }
    return json;
  });
}

export const client = ({ apiUrl }) => {

  const em = new EventEmitter();

  function request (method, url) {
    em.emit('request', { method, url });
    return window.fetch(url)
      .then(onAPIResponse);
  }

  const methods = {
    codenames: {
      fetch ({ lists, filters }) {
        return request('get', `${apiUrl}/codenames?lists=${lists.join(',')}&filters=${filters.join(',')}`);
      }
    }
  };

  return Object.assign(em, methods);
};

export default client;

