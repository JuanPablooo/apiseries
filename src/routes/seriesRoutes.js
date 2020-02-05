const router = require('express').Router();
const serieCrl = require("../controllers/series");

router.get('/', serieCrl.listar);
router.post("/", serieCrl.insere);
router.get('/:id', serieCrl.buscarPorId);
router.put('/:id', serieCrl.atualiza);
router.delete('/:id', serieCrl.delete);

module.exports = router;