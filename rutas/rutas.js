const express = require('express');
const sorteo = require('../controladores/sorteoController.js');
const boleto = require('../controladores/boletoController.js');

const router = express.Router();

//Sorteo
router.get('/sorteoboletos/:id', sorteo.getBoletosPorSorteo);

//Boleto
router.post('/boleto/:id', boleto.actualizarBoleto);
router.get('/boletos', boleto.getBoletos);
router.get('/boleto/:id', boleto.getBoleto);