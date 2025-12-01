import express from 'express';
import cors from 'cors';
import { setupSwagger } from './infrastructure/web/swagger';
import { SupabaseRolRepository } from './infrastructure/data/rol/supabase-rol.repository';
import { CreateRol } from './application/use-cases/rol/create-rol';
import { GetRol } from './application/use-cases/rol/get-rol';
import { GetAllRols } from './application/use-cases/rol/get-all-rols';
import { UpdateRol } from './application/use-cases/rol/update-rol';
import { DeleteRol } from './application/use-cases/rol/delete-rol';
import { RolController } from './infrastructure/web/rol/rol.controller';
import { rolRouter } from './infrastructure/web/rol/rol.routes';
import { SupabaseUsuarioRepository } from './infrastructure/data/usuario/supabase-usuario.repository';
import { SupabaseZonaRepository } from './infrastructure/data/zona/supabase-zona.repository';
import { SupabaseTurnoRepository } from './infrastructure/data/turno/supabase-turno.repository';
import { SupabaseRegistroAsistenciaRepository } from './infrastructure/data/registro-asistencia/supabase-registro-asistencia.repository';
import { SupabaseTiposIncidenteRepository } from './infrastructure/data/tipos-incidente/supabase-tipos-incidente.repository';
import { SupabaseIncidenteRepository } from './infrastructure/data/incidente/supabase-incidente.repository';
import { SupabaseEvidenciaIncidenteRepository } from './infrastructure/data/evidencia-incidente/supabase-evidencia-incidente.repository';
import { SupabaseEquipoCatalogoRepository } from './infrastructure/data/equipo-catalogo/supabase-equipo-catalogo.repository';
import { SupabaseEquipoAsignadoRepository } from './infrastructure/data/equipo-asignado/supabase-equipo-asignado.repository';
import { SupabaseCertificacionRepository } from './infrastructure/data/certificacion/supabase-certificacion.repository';
import { SupabaseGuardiaCertificacionRepository } from './infrastructure/data/guardia-certificacion/supabase-guardia-certificacion.repository';
import { CreateUsuario } from './application/use-cases/usuario/create-usuario';
import { GetUsuario } from './application/use-cases/usuario/get-usuario';
import { GetAllUsuarios } from './application/use-cases/usuario/get-all-usuarios';
import { UpdateUsuario } from './application/use-cases/usuario/update-usuario';
import { DeleteUsuario } from './application/use-cases/usuario/delete-usuario';
import { UsuarioController } from './infrastructure/web/usuario/usuario.controller';
import { usuarioRouter } from './infrastructure/web/usuario/usuario.routes';
import { CreateZona } from './application/use-cases/zona/create-zona';
import { GetZona } from './application/use-cases/zona/get-zona';
import { GetAllZonas } from './application/use-cases/zona/get-all-zonas';
import { UpdateZona } from './application/use-cases/zona/update-zona';
import { DeleteZona } from './application/use-cases/zona/delete-zona';
import { ZonaController } from './infrastructure/web/zona/zona.controller';
import { zonaRouter } from './infrastructure/web/zona/zona.routes';
import { CreateTurno } from './application/use-cases/turno/create-turno';
import { GetTurno } from './application/use-cases/turno/get-turno';
import { GetAllTurnos } from './application/use-cases/turno/get-all-turnos';
import { UpdateTurno } from './application/use-cases/turno/update-turno';
import { DeleteTurno } from './application/use-cases/turno/delete-turno';
import { GetTurnosByUsuarioId } from './application/use-cases/turno/get-turnos-by-usuario-id';
import { TurnoController } from './infrastructure/web/turno/turno.controller';
import { turnoRouter } from './infrastructure/web/turno/turno.routes';
import { CreateRegistroAsistencia } from './application/use-cases/registro-asistencia/create-registro-asistencia';
import { GetRegistroAsistencia } from './application/use-cases/registro-asistencia/get-registro-asistencia';
import { GetAllRegistrosAsistencia } from './application/use-cases/registro-asistencia/get-all-registros-asistencia';
import { UpdateRegistroAsistencia } from './application/use-cases/registro-asistencia/update-registro-asistencia';
import { DeleteRegistroAsistencia } from './application/use-cases/registro-asistencia/delete-registro-asistencia';
import { GetActiveRegistroAsistenciaByUsuarioId } from './application/use-cases/registro-asistencia/get-active-registro-asistencia-by-usuario-id';
import { GetEstadoRegistroAsistenciaPorUsuario } from './application/use-cases/registro-asistencia/get-estado-registro-asistencia-por-usuario';
import { RegistroAsistenciaController } from './infrastructure/web/registro-asistencia/registro-asistencia.controller';
import { registroAsistenciaRouter } from './infrastructure/web/registro-asistencia/registro-asistencia.routes';
import { CreateTiposIncidente } from './application/use-cases/tipos-incidente/create-tipos-incidente';
import { GetTiposIncidente } from './application/use-cases/tipos-incidente/get-tipos-incidente';
import { GetAllTiposIncidentes } from './application/use-cases/tipos-incidente/get-all-tipos-incidentes';
import { UpdateTiposIncidente } from './application/use-cases/tipos-incidente/update-tipos-incidente';
import { DeleteTiposIncidente } from './application/use-cases/tipos-incidente/delete-tipos-incidente';
import { TiposIncidenteController } from './infrastructure/web/tipos-incidente/tipos-incidente.controller';
import { tiposIncidenteRouter } from './infrastructure/web/tipos-incidente/tipos-incidente.routes';
import { CreateIncidente } from './application/use-cases/incidente/create-incidente';
import { GetIncidente } from './application/use-cases/incidente/get-incidente';
import { GetAllIncidentes } from './application/use-cases/incidente/get-all-incidentes';
import { UpdateIncidente } from './application/use-cases/incidente/update-incidente';
import { DeleteIncidente } from './application/use-cases/incidente/delete-incidente';
import { IncidenteController } from './infrastructure/web/incidente/incidente.controller';
import { incidenteRouter } from './infrastructure/web/incidente/incidente.routes';
import { CreateEvidenciaIncidente } from './application/use-cases/evidencia-incidente/create-evidencia-incidente';
import { GetEvidenciaIncidente } from './application/use-cases/evidencia-incidente/get-evidencia-incidente';
import { GetAllEvidenciasIncidente } from './application/use-cases/evidencia-incidente/get-all-evidencias-incidente';
import { UpdateEvidenciaIncidente } from './application/use-cases/evidencia-incidente/update-evidencia-incidente';
import { DeleteEvidenciaIncidente } from './application/use-cases/evidencia-incidente/delete-evidencia-incidente';
import { EvidenciaIncidenteController } from './infrastructure/web/evidencia-incidente/evidencia-incidente.controller';
import { evidenciaIncidenteRouter } from './infrastructure/web/evidencia-incidente/evidencia-incidente.routes';
import { CreateEquipoCatalogo } from './application/use-cases/equipo-catalogo/create-equipo-catalogo';
import { GetEquipoCatalogo } from './application/use-cases/equipo-catalogo/get-equipo-catalogo';
import { GetAllEquiposCatalogo } from './application/use-cases/equipo-catalogo/get-all-equipos-catalogo';
import { UpdateEquipoCatalogo } from './application/use-cases/equipo-catalogo/update-equipo-catalogo';
import { DeleteEquipoCatalogo } from './application/use-cases/equipo-catalogo/delete-equipo-catalogo';
import { EquipoCatalogoController } from './infrastructure/web/equipo-catalogo/equipo-catalogo.controller';
import { equipoCatalogoRouter } from './infrastructure/web/equipo-catalogo/equipo-catalogo.routes';
import { CreateEquipoAsignado } from './application/use-cases/equipo-asignado/create-equipo-asignado';
import { GetEquipoAsignado } from './application/use-cases/equipo-asignado/get-equipo-asignado';
import { GetAllEquiposAsignados } from './application/use-cases/equipo-asignado/get-all-equipos-asignados';
import { UpdateEquipoAsignado } from './application/use-cases/equipo-asignado/update-equipo-asignado';
import { DeleteEquipoAsignado } from './application/use-cases/equipo-asignado/delete-equipo-asignado';
import { EquipoAsignadoController } from './infrastructure/web/equipo-asignado/equipo-asignado.controller';
import { equipoAsignadoRouter } from './infrastructure/web/equipo-asignado/equipo-asignado.routes';
import { CreateCertificacion } from './application/use-cases/certificacion/create-certificacion';
import { GetCertificacion } from './application/use-cases/certificacion/get-certificacion';
import { GetAllCertificaciones } from './application/use-cases/certificacion/get-all-certificaciones';
import { UpdateCertificacion } from './application/use-cases/certificacion/update-certificacion';
import { DeleteCertificacion } from './application/use-cases/certificacion/delete-certificacion';
import { CertificacionController } from './infrastructure/web/certificacion/certificacion.controller';
import { certificacionRouter } from './infrastructure/web/certificacion/certificacion.routes';
import { CreateGuardiaCertificacion } from './application/use-cases/guardia-certificacion/create-guardia-certificacion';
import { GetGuardiaCertificacion } from './application/use-cases/guardia-certificacion/get-guardia-certificacion';
import { GetAllGuardiaCertificaciones } from './application/use-cases/guardia-certificacion/get-all-guardia-certificaciones';
import { UpdateGuardiaCertificacion } from './application/use-cases/guardia-certificacion/update-guardia-certificacion';
import { DeleteGuardiaCertificacion } from './application/use-cases/guardia-certificacion/delete-guardia-certificacion';
import { GuardiaCertificacionController } from './infrastructure/web/guardia-certificacion/guardia-certificacion.controller';
import { guardiaCertificacionRouter } from './infrastructure/web/guardia-certificacion/guardia-certificacion.routes';
import { CheckIn } from './application/use-cases/registro-asistencia/check-in';
import { CheckOut } from './application/use-cases/registro-asistencia/check-out';
import { LoginUser } from './application/use-cases/auth/login-user';
import { AuthController } from './infrastructure/web/auth/auth.controller';
import { authRouter } from './infrastructure/web/auth/auth.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Repositories
const rolRepository = new SupabaseRolRepository();
const usuarioRepository = new SupabaseUsuarioRepository();
const zonaRepository = new SupabaseZonaRepository();
const turnoRepository = new SupabaseTurnoRepository();
const registroAsistenciaRepository = new SupabaseRegistroAsistenciaRepository();
const tiposIncidenteRepository = new SupabaseTiposIncidenteRepository();
const incidenteRepository = new SupabaseIncidenteRepository();
const evidenciaIncidenteRepository = new SupabaseEvidenciaIncidenteRepository();
const equipoCatalogoRepository = new SupabaseEquipoCatalogoRepository();
const equipoAsignadoRepository = new SupabaseEquipoAsignadoRepository();
const certificacionRepository = new SupabaseCertificacionRepository();
const guardiaCertificacionRepository = new SupabaseGuardiaCertificacionRepository();

// Use Cases
const createRol = new CreateRol(rolRepository);
const getRol = new GetRol(rolRepository);
const getAllRols = new GetAllRols(rolRepository);
const updateRol = new UpdateRol(rolRepository);
const deleteRol = new DeleteRol(rolRepository);

const createUsuario = new CreateUsuario(usuarioRepository);
const getUsuario = new GetUsuario(usuarioRepository);
const getAllUsuarios = new GetAllUsuarios(usuarioRepository);
const updateUsuario = new UpdateUsuario(usuarioRepository);
const deleteUsuario = new DeleteUsuario(usuarioRepository);

const loginUser = new LoginUser(usuarioRepository);

const createZona = new CreateZona(zonaRepository);
const getZona = new GetZona(zonaRepository);
const getAllZonas = new GetAllZonas(zonaRepository);
const updateZona = new UpdateZona(zonaRepository);
const deleteZona = new DeleteZona(zonaRepository);

const createTurno = new CreateTurno(turnoRepository);
const getTurno = new GetTurno(turnoRepository);
const getAllTurnos = new GetAllTurnos(turnoRepository);
const updateTurno = new UpdateTurno(turnoRepository);
const deleteTurno = new DeleteTurno(turnoRepository);
const getTurnosByUsuarioId = new GetTurnosByUsuarioId(turnoRepository);

const createRegistroAsistencia = new CreateRegistroAsistencia(registroAsistenciaRepository);
const getRegistroAsistencia = new GetRegistroAsistencia(registroAsistenciaRepository);
const getAllRegistrosAsistencia = new GetAllRegistrosAsistencia(registroAsistenciaRepository);
const updateRegistroAsistencia = new UpdateRegistroAsistencia(registroAsistenciaRepository);
const deleteRegistroAsistencia = new DeleteRegistroAsistencia(registroAsistenciaRepository);
const checkIn = new CheckIn(registroAsistenciaRepository);
const checkOut = new CheckOut(registroAsistenciaRepository);
const getActiveRegistroAsistenciaByUsuarioId = new GetActiveRegistroAsistenciaByUsuarioId(registroAsistenciaRepository);
const getEstadosPorUsuario = new GetEstadoRegistroAsistenciaPorUsuario(registroAsistenciaRepository);

const createTiposIncidente = new CreateTiposIncidente(tiposIncidenteRepository);
const getTiposIncidente = new GetTiposIncidente(tiposIncidenteRepository);
const getAllTiposIncidentes = new GetAllTiposIncidentes(tiposIncidenteRepository);
const updateTiposIncidente = new UpdateTiposIncidente(tiposIncidenteRepository);
const deleteTiposIncidente = new DeleteTiposIncidente(tiposIncidenteRepository);

const createIncidente = new CreateIncidente(incidenteRepository);
const getIncidente = new GetIncidente(incidenteRepository);
const getAllIncidentes = new GetAllIncidentes(incidenteRepository);
const updateIncidente = new UpdateIncidente(incidenteRepository);
const deleteIncidente = new DeleteIncidente(incidenteRepository);

const createEvidenciaIncidente = new CreateEvidenciaIncidente(evidenciaIncidenteRepository);
const getEvidenciaIncidente = new GetEvidenciaIncidente(evidenciaIncidenteRepository);
const getAllEvidenciasIncidente = new GetAllEvidenciasIncidente(evidenciaIncidenteRepository);
const updateEvidenciaIncidente = new UpdateEvidenciaIncidente(evidenciaIncidenteRepository);
const deleteEvidenciaIncidente = new DeleteEvidenciaIncidente(evidenciaIncidenteRepository);

const createEquipoCatalogo = new CreateEquipoCatalogo(equipoCatalogoRepository);
const getEquipoCatalogo = new GetEquipoCatalogo(equipoCatalogoRepository);
const getAllEquiposCatalogo = new GetAllEquiposCatalogo(equipoCatalogoRepository);
const updateEquipoCatalogo = new UpdateEquipoCatalogo(equipoCatalogoRepository);
const deleteEquipoCatalogo = new DeleteEquipoCatalogo(equipoCatalogoRepository);

const createEquipoAsignado = new CreateEquipoAsignado(equipoAsignadoRepository);
const getEquipoAsignado = new GetEquipoAsignado(equipoAsignadoRepository);
const getAllEquiposAsignados = new GetAllEquiposAsignados(equipoAsignadoRepository);
const updateEquipoAsignado = new UpdateEquipoAsignado(equipoAsignadoRepository);
const deleteEquipoAsignado = new DeleteEquipoAsignado(equipoAsignadoRepository);

const createCertificacion = new CreateCertificacion(certificacionRepository);
const getCertificacion = new GetCertificacion(certificacionRepository);
const getAllCertificaciones = new GetAllCertificaciones(certificacionRepository);
const updateCertificacion = new UpdateCertificacion(certificacionRepository);
const deleteCertificacion = new DeleteCertificacion(certificacionRepository);

const createGuardiaCertificacion = new CreateGuardiaCertificacion(guardiaCertificacionRepository);
const getGuardiaCertificacion = new GetGuardiaCertificacion(guardiaCertificacionRepository);
const getAllGuardiaCertificaciones = new GetAllGuardiaCertificaciones(guardiaCertificacionRepository);
const updateGuardiaCertificacion = new UpdateGuardiaCertificacion(guardiaCertificacionRepository);
const deleteGuardiaCertificacion = new DeleteGuardiaCertificacion(guardiaCertificacionRepository);

// Controllers
const rolController = new RolController(createRol, getRol, getAllRols, updateRol, deleteRol);
const usuarioController = new UsuarioController(createUsuario, getUsuario, getAllUsuarios, updateUsuario, deleteUsuario);
const authController = new AuthController(loginUser);
const zonaController = new ZonaController(createZona, getZona, getAllZonas, updateZona, deleteZona);
const turnoController = new TurnoController(createTurno, getTurno, getAllTurnos, updateTurno, deleteTurno, getTurnosByUsuarioId);
const registroAsistenciaController = new RegistroAsistenciaController(
    createRegistroAsistencia,
    getRegistroAsistencia,
    getAllRegistrosAsistencia,
    updateRegistroAsistencia,
    deleteRegistroAsistencia,
    checkIn,
    checkOut,
    getActiveRegistroAsistenciaByUsuarioId,
    getEstadosPorUsuario
);
const tiposIncidenteController = new TiposIncidenteController(
    createTiposIncidente,
    getTiposIncidente,
    getAllTiposIncidentes,
    updateTiposIncidente,
    deleteTiposIncidente
);
const incidenteController = new IncidenteController(
    createIncidente,
    getIncidente,
    getAllIncidentes,
    updateIncidente,
    deleteIncidente
);
const evidenciaIncidenteController = new EvidenciaIncidenteController(
    createEvidenciaIncidente,
    getEvidenciaIncidente,
    getAllEvidenciasIncidente,
    updateEvidenciaIncidente,
    deleteEvidenciaIncidente
);
const equipoCatalogoController = new EquipoCatalogoController(
    createEquipoCatalogo,
    getEquipoCatalogo,
    getAllEquiposCatalogo,
    updateEquipoCatalogo,
    deleteEquipoCatalogo
);
const equipoAsignadoController = new EquipoAsignadoController(
    createEquipoAsignado,
    getEquipoAsignado,
    getAllEquiposAsignados,
    updateEquipoAsignado,
    deleteEquipoAsignado
);
const certificacionController = new CertificacionController(
    createCertificacion,
    getCertificacion,
    getAllCertificaciones,
    updateCertificacion,
    deleteCertificacion
);
const guardiaCertificacionController = new GuardiaCertificacionController(
    createGuardiaCertificacion,
    getGuardiaCertificacion,
    getAllGuardiaCertificaciones,
    updateGuardiaCertificacion,
    deleteGuardiaCertificacion
);

// Swagger
setupSwagger(app);

// Routes
app.use('/auth', authRouter(authController));
app.use('/rols', rolRouter(rolController));
app.use('/usuarios', usuarioRouter(usuarioController));
app.use('/zonas', zonaRouter(zonaController));
app.use('/turnos', turnoRouter(turnoController));
app.use('/registros-asistencia', registroAsistenciaRouter(registroAsistenciaController));
app.use('/tipos-incidente', tiposIncidenteRouter(tiposIncidenteController));
app.use('/incidentes', incidenteRouter(incidenteController));
app.use('/evidencias-incidente', evidenciaIncidenteRouter(evidenciaIncidenteController));
app.use('/equipos-catalogo', equipoCatalogoRouter(equipoCatalogoController));
app.use('/equipos-asignados', equipoAsignadoRouter(equipoAsignadoController));
app.use('/certificaciones', certificacionRouter(certificacionController));
app.use('/guardias-certificaciones', guardiaCertificacionRouter(guardiaCertificacionController));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});