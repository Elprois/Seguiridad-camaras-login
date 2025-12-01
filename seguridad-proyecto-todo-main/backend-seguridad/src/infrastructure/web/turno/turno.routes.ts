import { Router } from 'express';
import { TurnoController } from './turno.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Turno:
 *       type: object
 *       required:
 *         - id_turno
 *         - id_usuario
 *         - id_zona
 *         - fecha_hora_inicio
 *         - fecha_hora_fin
 *         - estado
 *       properties:
 *         id_turno:
 *           type: number
 *           description: The auto-generated id of the turno
 *         id_usuario:
 *           type: number
 *           description: The id of the usuario
 *         id_zona:
 *           type: number
 *           description: The id of the zona
 *         fecha_hora_inicio:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the turno
 *         fecha_hora_fin:
 *           type: string
 *           format: date-time
 *           description: The end date and time of the turno
 *         estado:
 *           type: string
 *           description: The state of the turno
 *       example:
 *         id_turno: 1
 *         id_usuario: 1
 *         id_zona: 1
 *         fecha_hora_inicio: "2025-11-20T09:00:00.000Z"
 *         fecha_hora_fin: "2025-11-20T17:00:00.000Z"
 *         estado: "Asignado"
 */

export const turnoRouter = (controller: TurnoController) => {
    const router = Router();

    /**
     * @swagger
     * /turnos:
     *   post:
     *     summary: Create a new turno
     *     tags: [Turnos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Turno'
     *     responses:
     *       201:
     *         description: The turno was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Turno'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /turnos/{id}:
     *   get:
     *     summary: Get the turno by id
     *     tags: [Turnos]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The turno id
     *     responses:
     *       200:
     *         description: The turno description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Turno'
     *       404:
     *         description: The turno was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /turnos:
     *   get:
     *     summary: Returns the list of all the turnos
     *     tags: [Turnos]
     *     responses:
     *       200:
     *         description: The list of the turnos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Turno'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /turnos/{id}:
     *  put:
     *    summary: Update the turno by the id
     *    tags: [Turnos]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The turno id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Turno'
     *    responses:
     *      200:
     *        description: The turno was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Turno'
     *      404:
     *        description: The turno was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /turnos/{id}:
     *   delete:
     *     summary: Remove the turno by id
     *     tags: [Turnos]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The turno id
     *
     *     responses:
     *       204:
     *         description: The turno was deleted
     *       404:
     *         description: The turno was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    /**
     * @swagger
     * /turnos/usuario/{id}:
     *   get:
     *     summary: Get the turnos by usuario id
     *     tags: [Turnos]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The usuario id
     *     responses:
     *       200:
     *         description: The list of the turnos by usuario id
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Turno'
     *       404:
     *         description: The turnos were not found
     */
    router.get('/usuario/:id', (req, res) => controller.findByUsuarioId(req, res));

    return router;
};
