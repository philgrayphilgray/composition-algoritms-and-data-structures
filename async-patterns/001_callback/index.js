const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const api = 'http://localhost:3000';
const result = {};

const ajax = (url, cb) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', cb);
  oReq.open('GET', url);
  oReq.send();
};

function reqListener() {
  const poets = JSON.parse(this.responseText);
  poets.forEach(poet => {
    ajax(`${api}/poems`, function() {
      const poems = JSON.parse(this.responseText)
        .filter(poem => poem.author === poet.name)
        .map(poem => poem.title);
      result[poet.name] = poems;
      if (Object.keys(result).length === poets.length) {
        console.log(result);
      }
    });
  });
}

ajax(`${api}/poets`, reqListener);
