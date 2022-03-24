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
        let produtoRemovido = req.query.removido;
        res.render('home', { rows, produtoRemovido });
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

// Update product "view" 
exports.edit = (req, res) => {
  conn.query(
    `SELECT 
        *
      FROM 
        produto
      WHERE
        id_produto = ?`, [req.params.id],
    (error, rows) => {
      if (!error) {
        console.log(rows);
        res.render('atualizar_produto', { rows });
      } else {
        console.log(error);
      }
    }
  );
};

// Update product
exports.update = (req, res) => {
  const { nome, fabricante, preco, validade, quantidade, categoria } = req.body;

  quantidadeParsed = parseInt(quantidade);
  precoParsed = parseFloat(preco);

  conn.query(
    `UPDATE
      produto
    SET
      nome = ?,
      fabricante = ?,
      preco = ?,
      validade = ?,
      quantidade = ?,
      categoria = ?
    WHERE
      id_produto = ?`, [nome, fabricante, precoParsed, validade, quantidadeParsed, categoria, req.params.id],
    (error, rows) => {
      if (!error) {
        conn.query(
          `SELECT 
              *
            FROM 
              produto
            WHERE
              id_produto = ?`, [req.params.id],
          (error, rows) => {
            if (!error) {
              console.log(rows);
              res.render('atualizar_produto', { rows, message: `Produto atualizado!` });
            } else {
              console.log(error);
            }
          }
        );
        console.log(rows);
      } else {
        console.log(error);
      }
    }
  );
};

exports.delete = (req, res) => {
  conn.query(`DELETE FROM produto WHERE id_produto = ?`, [req.params.id],
    (error) => {
      if (!error) {
        let produtoRemovido = encodeURIComponent('Produto deletado com sucesso.');
        res.redirect(`/?removido=${produtoRemovido}`);
      } else {
        console.log(error);
      }
    }
  );
}

exports.viewInfo = (req, res) => {
  conn.query(
    `SELECT 
        *
      FROM 
        produto
      WHERE
        id_produto = ?`, [req.params.id],
    (error, rows) => {
      if (!error) {
        res.render('detalhes-produto', { rows });
      } else {
        console.log(error);
      }
    }
  );
};