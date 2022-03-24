const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.view);
router.post('/', produtoController.search);

router.get('/cadastroproduto', produtoController.addView);
router.post('/cadastroproduto', produtoController.add);

router.get('/atualizarproduto/:id', produtoController.edit);
router.post('/atualizarproduto/:id', produtoController.update);

router.get('/:id', produtoController.delete);

router.get('/info/:id', produtoController.viewInfo);

module.exports = router;
