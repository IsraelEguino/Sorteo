const express = require('express');

const sorteo = require('../controladores/sorteoController.js');
const boleto = require('../controladores/boletoController.js');

const router = express.Router();

//Sorteo
router.put('/sorteo', sorteo.guardarSorteo);
router.get('/sorteo/:id', sorteo.getSorteo);
router.get('/sorteos', sorteo.getSorteos);
router.get('/sorteoboletos/:id', sorteo.getBoletosPorSorteo);
router.delete('/sorteo/:id', sorteo.eliminarSorteo);
router.post('/sorteo/:id', sorteo.actualizarSorteo);

//Boleto
router.post('/boleto/:_id', boleto.actualizarBoleto);
router.get('/boletos', boleto.getBoletos);
router.get('/boleto/:_id', boleto.getBoleto);


module.exports = router;