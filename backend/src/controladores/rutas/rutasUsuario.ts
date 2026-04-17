import { Router } from 'express';
import { 
  crearUsuario, 
  obtenerUsuario, 
  listarUsuarios, 
  actualizarUsuario, 
  desactivarUsuario 
} from '../UsuarioControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.post('/', crearUsuario);
router.get('/', verificarToken, verificarRol(['FUNCIONARIO_ICA']), listarUsuarios);
router.get('/:identificacion', verificarToken, obtenerUsuario);
router.put('/:identificacion', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarUsuario);
router.delete('/:identificacion', verificarToken, verificarRol(['FUNCIONARIO_ICA']), desactivarUsuario);

export default router;