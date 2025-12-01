import { Router } from 'express';
import { RegistroAsistenciaController } from './registro-asistencia.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroAsistencia:
 *       type: object
 *       required:
 *         - id_registro
 *         - id_turno
 *         - id_usuario
 *         - check_in_time
 *       properties:
 *         id_registro:
 *           type: number
 *           description: The auto-generated id of the registro asistencia
 *         id_turno:
 *           type: number
 *           description: The id of the turno
 *         id_usuario:
 *           type: number
 *           description: The id of the usuario
 *         check_in_time:
 *           type: string
 *           format: date-time
 *           description: The check-in time
 *         check_out_time:
 *           type: string
 *           format: date-time
 *           description: The check-out time
 *       example:
 *         id_registro: 1
 *         id_turno: 1
 *         id_usuario: 1
 *         check_in_time: "2025-11-20T09:00:00.000Z"
 *         check_out_time: "2025-11-20T17:00:00.000Z"
 */

export const registroAsistenciaRouter = (controller: RegistroAsistenciaController) => {
    const router = Router();

    /**
     * @swagger
     * /registros-asistencia:
     *   post:
     *     summary: Create a new registro asistencia
     *     tags: [RegistrosAsistencia]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegistroAsistencia'
     *     responses:
     *       201:
     *         description: The registro asistencia was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *   get:
     *     summary: Get the registro asistencia by id
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The registro asistencia id
     *     responses:
     *       200:
     *         description: The registro asistencia description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       404:
     *         description: The registro asistencia was not found
     */
    router.get('/estado-por-usuario', (req, res) => controller.getEstadoPorUsuario(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *   get:
     *     summary: Get the registro asistencia by id
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The registro asistencia id
     *     responses:
     *       200:
     *         description: The registro asistencia description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       404:
     *         description: The registro asistencia was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *  put:
     *    summary: Update the registro asistencia by the id
     *    tags: [RegistrosAsistencia]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The registro asistencia id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/RegistroAsistencia'
     *    responses:
     *      200:
     *        description: The registro asistencia was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/RegistroAsistencia'
     *      404:
     *        description: The registro asistencia was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *   delete:
     *     summary: Remove the registro asistencia by id
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The registro asistencia id
     *
     *     responses:
     *       204:
     *         description: The registro asistencia was deleted
     *       404:
     *         description: The registro asistencia was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    /**
     * @swagger
     * /registros-asistencia/check-in:
     *   post:
     *     summary: Perform a check-in
     *     tags: [RegistrosAsistencia]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id_turno:
     *                 type: number
     *               id_usuario:
     *                 type: number
     *     responses:
     *       201:
     *         description: The check-in was successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       500:
     *         description: Some server error
     */
    router.post('/check-in', (req, res) => controller.handleCheckIn(req, res));

    /**
     * @swagger
     * /registros-asistencia/check-out/{id}:
     *   put:
     *     summary: Perform a check-out
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The registro asistencia id
     *     responses:
     *       200:
     *         description: The check-out was successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       404:
     *         description: The registro asistencia was not found
     *       500:
     *         description: Some server error
     */
    router.put('/check-out/:id', (req, res) => controller.handleCheckOut(req, res));

    /**
     * @swagger
     * /registros-asistencia/activo/usuario/{id}:
     *   get:
     *     summary: Get the active registro asistencia by usuario id
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The usuario id
     *     responses:
     *       200:
     *         description: The active registro asistencia description by usuario id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       404:
     *         description: The registro asistencia was not found
     */
    router.get('/activo/usuario/:id', (req, res) => controller.findActiveByUsuarioId(req, res));

    /**
     * @swagger
     * /registros-asistencia/estado-por-usuario:
     *   get:
     *     summary: Get the current shift status for all guards
     *     tags: [RegistrosAsistencia]
     *     responses:
     *       200:
     *         description: The list of the current shift status for all guards
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id_usuario:
     *                     type: number
     *                   nombre:
     *                     type: string
     *                   apellido:
     *                     type: string
     *                   estado_turno:
     *                     type: string
     *                   hora:
     *                     type: string
     *       500:
     *         description: Some server error
     */
    router.get('/estado-por-usuario', (req, res) => controller.getEstadoPorUsuario(req, res));

    return router;
};
