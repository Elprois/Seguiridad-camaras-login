import { Router } from 'express';
import { TiposIncidenteController } from './tipos-incidente.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     TiposIncidente:
 *       type: object
 *       required:
 *         - id_tipo_incidente
 *         - nombre_tipo
 *       properties:
 *         id_tipo_incidente:
 *           type: number
 *           description: The auto-generated id of the tipos incidente
 *         nombre_tipo:
 *           type: string
 *           description: The name of the tipos incidente
 *       example:
 *         id_tipo_incidente: 1
 *         nombre_tipo: "Robo"
 */

export const tiposIncidenteRouter = (controller: TiposIncidenteController) => {
    const router = Router();

    /**
     * @swagger
     * /tipos-incidente:
     *   post:
     *     summary: Create a new tipos incidente
     *     tags: [TiposIncidente]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TiposIncidente'
     *     responses:
     *       201:
     *         description: The tipos incidente was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TiposIncidente'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /tipos-incidente/{id}:
     *   get:
     *     summary: Get the tipos incidente by id
     *     tags: [TiposIncidente]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The tipos incidente id
     *     responses:
     *       200:
     *         description: The tipos incidente description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TiposIncidente'
     *       404:
     *         description: The tipos incidente was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /tipos-incidente:
     *   get:
     *     summary: Returns the list of all the tipos incidentes
     *     tags: [TiposIncidente]
     *     responses:
     *       200:
     *         description: The list of the tipos incidentes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/TiposIncidente'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /tipos-incidente/{id}:
     *  put:
     *    summary: Update the tipos incidente by the id
     *    tags: [TiposIncidente]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The tipos incidente id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/TiposIncidente'
     *    responses:
     *      200:
     *        description: The tipos incidente was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/TiposIncidente'
     *      404:
     *        description: The tipos incidente was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /tipos-incidente/{id}:
     *   delete:
     *     summary: Remove the tipos incidente by id
     *     tags: [TiposIncidente]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The tipos incidente id
     *
     *     responses:
     *       204:
     *         description: The tipos incidente was deleted
     *       404:
     *         description: The tipos incidente was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
