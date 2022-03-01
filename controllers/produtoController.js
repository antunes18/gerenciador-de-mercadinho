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
