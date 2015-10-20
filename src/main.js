import { client } from './Client';
import store from './store';

const DEFAULTS = {
  ERROR_MESSAGE: 'Something terrible has happened',
  STATE: {
    content: 'ok',
    error: '',
    curl: ''
  }
};

function render (state) {
  return `
  <section>
    <div><h1>${state.content}</h1></div>
    <div class="error">${state.error}</div>
  </section>
  <pre>${state.curl}</pre>
  `;
}

function onFetch (assignState, json) {
  assignState({
    content: json && json.toString()
  });
}

function onError (assignState, err) {
  console.error(err);
  assignState({
    error: err ? err.message : DEFAULTS.ERROR_MESSAGE
  });
}

function onRequest (assignState, { method, url }) {
  let [pathname, query] = url.split('?');
  let newCurl = `$ QUERY='${query}'\n` + [
    `$ curl -X ${method}`,
    `${pathname}?\${QUERY}`
  ].join(' \\\n\t');
  assignState({ curl: newCurl });
}

function fetchCodename (assignState, api, query) {
  api.codenames.fetch(query)
    .catch(onError.bind(null, assignState))
    .then(onFetch.bind(null, assignState));
}

window.codename = function (el, opts) {

  let state = store();

  function assignState (newState) {
    el.innerHTML = render(state.assign(newState));
  }

  const api = client({
    apiUrl: opts.apiUrl
  });

  const query = {
    lists: ['crayons', 'cities'],
    filters: ['alliterative', 'random']
  };

  api.on('request', onRequest.bind(null, assignState));

  el.addEventListener('click', function () {
    fetchCodename(assignState, api, query);
  });

  assignState(DEFAULTS.STATE);
  fetchCodename(assignState, api, query);
};

