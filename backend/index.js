const express = require('express');
const app = express();
const port = 3001;
// rodar o backend: comando: node index.js
// para atualizar sempre: npm run devStart
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});