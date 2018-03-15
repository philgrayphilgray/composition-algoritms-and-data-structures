const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const api = 'http://localhost:3000';
const result = {};

const ajax = (url, cb) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', cb);
  oReq.open('GET', url);
  oReq.send();
};

function getFile(url) {
  let text, fn;

  ajax(url, function() {
    if (fn) fn(this.responseText);
    else text = this.responseText;
  });

  return function(cb) {
    if (text) cb(text);
    else fn = cb;
  };
}

var th1 = getFile(`${api}/poets`);
var th2 = getFile(`${api}/poems`);

//coordinate the responses
th1(function(response) {
  const poets = JSON.parse(response);
  th2(function(response2) {
    const poems = JSON.parse(response2);
    poets.forEach(
      poet =>
        (result[poet.name] = poems
          .filter(poem => poem.author === poet.name)
          .map(poem => poem.title))
    );
    console.log(result);
  });
});
