import { Router } from 'express';
import {
  registrarLote,
  obtenerLote,
  listarLotesPorLugar,
  actualizarLote,
  cambiarEstadoLote
} from '../LoteControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.post('/', verificarToken, verificarRol(['FUNCIONARIO_ICA']), registrarLote);
router.get('/:idLote', verificarToken, obtenerLote);
router.get('/lugar/:nroRegICAlugar', verificarToken, listarLotesPorLugar);
router.put('/:idLote', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarLote);
router.patch('/:idLote/estado', verificarToken, verificarRol(['FUNCIONARIO_ICA']), cambiarEstadoLote);

export default router;