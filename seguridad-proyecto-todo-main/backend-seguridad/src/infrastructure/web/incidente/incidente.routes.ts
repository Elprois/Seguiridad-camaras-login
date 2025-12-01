import { Router } from 'express';
import { IncidenteController } from './incidente.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Incidente:
 *       type: object
 *       required:
 *         - id_incidente
 *         - id_tipo_incidente
 *         - descripcion
 *         - latitud
 *         - longitud
 *         - fecha_hora_reporte
 *         - estado_validacion
 *         - estado_sincronizacion
 *       properties:
 *         id_incidente:
 *           type: number
 *           description: The auto-generated id of the incidente
 *         id_usuario_reporta:
 *           type: number
 *           description: The id of the usuario who reported the incidente
 *         id_tipo_incidente:
 *           type: number
 *           description: The id of the tipo de incidente
 *         descripcion:
 *           type: string
 *           description: The description of the incidente
 *         latitud:
 *           type: number
 *           description: The latitude of the incidente
 *         longitud:
 *           type: number
 *           description: The longitude of the incidente
 *         fecha_hora_reporte:
 *           type: string
 *           format: date-time
 *           description: The date and time of the reporte
 *         estado_validacion:
 *           type: string
 *           description: The validation state of the incidente
 *         estado_sincronizacion:
 *           type: string
 *           description: The synchronization state of the incidente
 *       example:
 *         id_incidente: 1
 *         id_usuario_reporta: 1
 *         id_tipo_incidente: 1
 *         descripcion: "Robo en la tienda de la esquina"
 *         latitud: 19.432608
 *         longitud: -99.133209
 *         fecha_hora_reporte: "2025-11-20T10:00:00.000Z"
 *         estado_validacion: "Pendiente"
 *         estado_sincronizacion: "Pendiente"
 */

export const incidenteRouter = (controller: IncidenteController) => {
    const router = Router();

    /**
     * @swagger
     * /incidentes:
     *   post:
     *     summary: Create a new incidente
     *     tags: [Incidentes]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Incidente'
     *     responses:
     *       201:
     *         description: The incidente was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Incidente'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /incidentes/{id}:
     *   get:
     *     summary: Get the incidente by id
     *     tags: [Incidentes]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The incidente id
     *     responses:
     *       200:
     *         description: The incidente description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Incidente'
     *       404:
     *         description: The incidente was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /incidentes:
     *   get:
     *     summary: Returns the list of all the incidentes
     *     tags: [Incidentes]
     *     responses:
     *       200:
     *         description: The list of the incidentes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Incidente'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /incidentes/{id}:
     *  put:
     *    summary: Update the incidente by the id
     *    tags: [Incidentes]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The incidente id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Incidente'
     *    responses:
     *      200:
     *        description: The incidente was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Incidente'
     *      404:
     *        description: The incidente was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /incidentes/{id}:
     *   delete:
     *     summary: Remove the incidente by id
     *     tags: [Incidentes]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The incidente id
     *
     *     responses:
     *       204:
     *         description: The incidente was deleted
     *       404:
     *         description: The incidente was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
