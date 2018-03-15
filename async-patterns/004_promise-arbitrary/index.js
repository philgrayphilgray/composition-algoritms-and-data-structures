const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const api = 'http://localhost:3000';
const ajax = (url, resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    resolve(xhr.responseText);
  };
  xhr.onerror = function() {
    reject({ status: this.status, statusText: xhr.statusText });
  };
  xhr.send();
};

function getFile(url) {
  return new Promise(function(resolve, reject) {
    ajax(url, resolve, reject);
  });
}

const results = {};
let count = 0;

function storeInResults(response) {
  const parsed = JSON.parse(response);
  if (count === 0) {
    results['poets'] = parsed;
  } else if (count === 1) {
    results['poems'] = parsed;
  } else {
    results[count] = parsed;
  }
  count++;
}

function processResults() {
  return results.poets.map(poet => {
    return {
      poet: poet.name,
      poems: results.poems
        .filter(poem => poem.author === poet.name)
        .map(poem => poem.title)
    };
  });
}

[`${api}/poets`, `${api}/poems`]
  .map(getFile)
  .reduce(
    (chain, pr) => chain.then(() => pr).then(storeInResults),
    Promise.resolve()
  )
  .then(processResults)
  .then(console.log)
  .catch(console.error);
