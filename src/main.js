require('./reset.css');
require('./main.css');

import { client } from './Client';

const API_URL = 'http://localhost:3202/api/codenames?lists=crayons,cities&filters=alliterative,random';

window.codename = function (el) {

  function updateCodename (json) {
    el.textContent = json.toString();
  }

  function oneMore () {
    client(API_URL)
      .catch((err) => { console.log('sadpanda', err); })
      .then(updateCodename);
  }

  el.addEventListener('click', function () {
    oneMore();
  });

  oneMore();
};

