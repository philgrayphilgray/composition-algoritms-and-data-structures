const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const api = 'http://localhost:3000';
const result = {};

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

var p1 = getFile(`${api}/poets`);
var p2 = getFile(`${api}/poems`);

//coordinate the responses

let poets;

p1
  .then(response => {
    poets = JSON.parse(response);
  })
  .then(() => p2)
  .then(response => {
    const poems = JSON.parse(response);
    poets.forEach(poet => {
      result[poet.name] = poems
        .filter(poem => poem.author === poet.name)
        .map(poem => poem.title);
    });
    console.log(result);
  })
  .catch(err => console.error('Error: ' + err.statusText));
