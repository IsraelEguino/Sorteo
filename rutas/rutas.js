const express = require('express');
const sorteo = require('../controladores/sorteoController');
const boleto = require('../controladores/boletoController');

const router = express.Router();

//Sorteo
router.get('/sorteoboletos/:id', sorteo.getBoletosPorSorteo);

//Boleto
router.post('/boleto/:id', boleto.actualizarBoleto);
router.get('/boletos', boleto.getBoletos);
router.get('/boleto/:id', boleto.getBoleto);