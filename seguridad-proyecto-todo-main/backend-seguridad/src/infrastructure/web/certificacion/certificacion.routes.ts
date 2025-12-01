import { Router } from 'express';
import { CertificacionController } from './certificacion.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Certificacion:
 *       type: object
 *       required:
 *         - id_certificacion
 *         - nombre_cert
 *       properties:
 *         id_certificacion:
 *           type: number
 *           description: The auto-generated id of the certificacion
 *         nombre_cert:
 *           type: string
 *           description: The name of the certificacion
 *       example:
 *         id_certificacion: 1
 *         nombre_cert: "Primeros Auxilios"
 */

export const certificacionRouter = (controller: CertificacionController) => {
    const router = Router();

    /**
     * @swagger
     * /certificaciones:
     *   post:
     *     summary: Create a new certificacion
     *     tags: [Certificaciones]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Certificacion'
     *     responses:
     *       201:
     *         description: The certificacion was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Certificacion'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /certificaciones/{id}:
     *   get:
     *     summary: Get the certificacion by id
     *     tags: [Certificaciones]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The certificacion id
     *     responses:
     *       200:
     *         description: The certificacion description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Certificacion'
     *       404:
     *         description: The certificacion was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /certificaciones:
     *   get:
     *     summary: Returns the list of all the certificaciones
     *     tags: [Certificaciones]
     *     responses:
     *       200:
     *         description: The list of the certificaciones
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Certificacion'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /certificaciones/{id}:
     *  put:
     *    summary: Update the certificacion by the id
     *    tags: [Certificaciones]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The certificacion id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Certificacion'
     *    responses:
     *      200:
     *        description: The certificacion was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Certificacion'
     *      404:
     *        description: The certificacion was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /certificaciones/{id}:
     *   delete:
     *     summary: Remove the certificacion by id
     *     tags: [Certificaciones]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The certificacion id
     *
     *     responses:
     *       204:
     *         description: The certificacion was deleted
     *       404:
     *         description: The certificacion was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
