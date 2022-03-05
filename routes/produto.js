const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.view);
router.post('/', produtoController.search);
router.get('/cadastroproduto', produtoController.addView);
router.post('/cadastroproduto', produtoController.add);

module.exports = router;
