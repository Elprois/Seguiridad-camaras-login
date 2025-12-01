import { Router } from 'express';
import { EquipoAsignadoController } from './equipo-asignado.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     EquipoAsignado:
 *       type: object
 *       required:
 *         - id_asignacion
 *         - id_equipo
 *         - id_usuario
 *         - fecha_asignacion
 *         - estado
 *       properties:
 *         id_asignacion:
 *           type: number
 *           description: The auto-generated id of the equipo asignado
 *         id_equipo:
 *           type: number
 *           description: The id of the equipo
 *         id_usuario:
 *           type: number
 *           description: The id of the usuario
 *         fecha_asignacion:
 *           type: string
 *           format: date
 *           description: The date of the asignacion
 *         estado:
 *           type: string
 *           description: The state of the equipo asignado
 *       example:
 *         id_asignacion: 1
 *         id_equipo: 1
 *         id_usuario: 1
 *         fecha_asignacion: "2025-11-20"
 *         estado: "Operativo"
 */

export const equipoAsignadoRouter = (controller: EquipoAsignadoController) => {
    const router = Router();

    /**
     * @swagger
     * /equipos-asignados:
     *   post:
     *     summary: Create a new equipo asignado
     *     tags: [EquiposAsignados]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EquipoAsignado'
     *     responses:
     *       201:
     *         description: The equipo asignado was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EquipoAsignado'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /equipos-asignados/{id}:
     *   get:
     *     summary: Get the equipo asignado by id
     *     tags: [EquiposAsignados]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The equipo asignado id
     *     responses:
     *       200:
     *         description: The equipo asignado description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EquipoAsignado'
     *       404:
     *         description: The equipo asignado was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /equipos-asignados:
     *   get:
     *     summary: Returns the list of all the equipos asignados
     *     tags: [EquiposAsignados]
     *     responses:
     *       200:
     *         description: The list of the equipos asignados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/EquipoAsignado'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /equipos-asignados/{id}:
     *  put:
     *    summary: Update the equipo asignado by the id
     *    tags: [EquiposAsignados]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The equipo asignado id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/EquipoAsignado'
     *    responses:
     *      200:
     *        description: The equipo asignado was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/EquipoAsignado'
     *      404:
     *        description: The equipo asignado was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /equipos-asignados/{id}:
     *   delete:
     *     summary: Remove the equipo asignado by id
     *     tags: [EquiposAsignados]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The equipo asignado id
     *
     *     responses:
     *       204:
     *         description: The equipo asignado was deleted
     *       404:
     *         description: The equipo asignado was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
