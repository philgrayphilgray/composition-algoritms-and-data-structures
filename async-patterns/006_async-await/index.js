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

async function getPoetsAndPoems(poetsUrl, poemsUrl) {
  try {
    const poets = await getFile(poetsUrl);
    const poems = await getFile(poemsUrl);
    const result = JSON.parse(poets).map(poet => {
      return {
        poet: poet.name,
        poems: JSON.parse(poems)
          .filter(poem => poem.author === poet.name)
          .map(poem => poem.title)
      };
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const poetsUrl = `${api}/poets`;
const poemsUrl = `${api}/poems`;

getPoetsAndPoems(poetsUrl, poemsUrl);
