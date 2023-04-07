const fetch = require('node-fetch');
const { insereDadosNaTabela } = require('./db');

function obterDadosDaApi() {
    fetch('url_da_sua_api')
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                insereDadosNaTabela(item);
            });
        })
        .catch(err => console.error(err));
}

obterDadosDaApi();

setInterval(() => {
    obterDadosDaApi();
}, 5 * 60 * 1000);
