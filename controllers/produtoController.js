const conn = require('../dbconn');

// View products
exports.view = (req, res) => {
  conn.query(
    `SELECT 
        id_produto, 
        nome, 
        fabricante, 
        preco, 
        quantidade, 
        categoria
      FROM 
        produto`,
    (error, rows) => {
      if (!error) {
        res.render('home', { rows });
      } else {
        console.log(error);
      }
    }
  );
};

// Find products
exports.search = (req, res) => {
  let searchValue = req.body.search;

  conn.query(
    `SELECT
        *
      FROM 
        produto
      WHERE
        nome LIKE ? OR fabricante LIKE ? OR preco LIKE ?`,
    [`%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`],
    (error, rows) => {
      if (!error) {
        res.render('home', { rows });
      } else {
        console.log(error);
      }
    }
  );
};

// View add product page
exports.addView = (req, res) => {
  res.render('cadastrar_produto');
};

// Add new product
exports.add = (req, res) => {
  const { nome, fabricante, preco, validade, quantidade, categoria } = req.body;

  quantidadeParsed = parseInt(quantidade);
  precoParsed = parseFloat(preco);

  conn.query(
    `INSERT INTO 
        produto 
      SET 
        nome = ?, 
        fabricante = ?, 
        preco = ?, 
        validade = ?,
        quantidade = ?,
        categoria = ?`,
    [nome, fabricante, precoParsed, validade, quantidadeParsed, categoria],
    (error, rows) => {
      if (!error) {
        res.render('cadastrar_produto', {
          message: 'Produto inserido com sucesso no banco de dados! 😎',
        });
      } else {
        console.log(error);
      }
    }
  );
};
