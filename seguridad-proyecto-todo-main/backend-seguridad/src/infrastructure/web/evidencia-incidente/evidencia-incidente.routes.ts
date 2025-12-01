import { Router } from 'express';
import { EvidenciaIncidenteController } from './evidencia-incidente.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     EvidenciaIncidente:
 *       type: object
 *       required:
 *         - id_evidencia
 *         - id_incidente
 *         - tipo_archivo
 *         - url_archivo
 *       properties:
 *         id_evidencia:
 *           type: number
 *           description: The auto-generated id of the evidencia incidente
 *         id_incidente:
 *           type: number
 *           description: The id of the incidente
 *         tipo_archivo:
 *           type: string
 *           description: The type of the file
 *         url_archivo:
 *           type: string
 *           description: The url of the file
 *       example:
 *         id_evidencia: 1
 *         id_incidente: 1
 *         tipo_archivo: "Imagen"
 *         url_archivo: "https://example.com/imagen.jpg"
 */

export const evidenciaIncidenteRouter = (controller: EvidenciaIncidenteController) => {
    const router = Router();

    /**
     * @swagger
     * /evidencias-incidente:
     *   post:
     *     summary: Create a new evidencia incidente
     *     tags: [EvidenciasIncidente]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EvidenciaIncidente'
     *     responses:
     *       201:
     *         description: The evidencia incidente was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EvidenciaIncidente'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /evidencias-incidente/{id}:
     *   get:
     *     summary: Get the evidencia incidente by id
     *     tags: [EvidenciasIncidente]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The evidencia incidente id
     *     responses:
     *       200:
     *         description: The evidencia incidente description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EvidenciaIncidente'
     *       404:
     *         description: The evidencia incidente was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /evidencias-incidente:
     *   get:
     *     summary: Returns the list of all the evidencias incidentes
     *     tags: [EvidenciasIncidente]
     *     responses:
     *       200:
     *         description: The list of the evidencias incidentes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/EvidenciaIncidente'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /evidencias-incidente/{id}:
     *  put:
     *    summary: Update the evidencia incidente by the id
     *    tags: [EvidenciasIncidente]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The evidencia incidente id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/EvidenciaIncidente'
     *    responses:
     *      200:
     *        description: The evidencia incidente was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/EvidenciaIncidente'
     *      404:
     *        description: The evidencia incidente was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /evidencias-incidente/{id}:
     *   delete:
     *     summary: Remove the evidencia incidente by id
     *     tags: [EvidenciasIncidente]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The evidencia incidente id
     *
     *     responses:
     *       204:
     *         description: The evidencia incidente was deleted
     *       404:
     *         description: The evidencia incidente was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
