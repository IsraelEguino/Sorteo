const boleto = require('../../modelos/Boleto')
const controlBoleto = require('../../controladores/boletoController');
test('gets boleto of id from database', () => {
  expect(controlBoleto.getBoleto(1, boleto)).toBe(controlBoleto.getBoleto(1, boleto));
});
test('frees boletos of selected boletos from database', () => {
  expect(controlBoleto.actualizarBoleto(1,1)).toBe(controlBoleto.actualizarBoleto(1,1));
});
test('deletes boleto of id from database', () => {
  expect(controlBoleto.eliminarBoleto(1)).toBe(controlBoleto.eliminarBoleto(1));
});