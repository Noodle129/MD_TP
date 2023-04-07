const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'nome_do_seu_banco_de_dados'
});

function insereDadosNaTabela(dados) {
    const sql = `INSERT INTO tabela (coluna1, coluna2, coluna3) VALUES (?, ?, ?)`;
    const values = [dados.valor1, dados.valor2, dados.valor3];
    connection.query(sql, values, (error, results, fields) => {
        if (error) throw error;
        console.log(`Novo registro inserido na tabela com ID ${results.insertId}`);
    });
}

module.exports = { insereDadosNaTabela };
