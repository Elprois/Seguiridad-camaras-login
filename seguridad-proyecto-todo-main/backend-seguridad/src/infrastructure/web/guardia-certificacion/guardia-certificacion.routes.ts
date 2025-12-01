import { Router } from 'express';
import { GuardiaCertificacionController } from './guardia-certificacion.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     GuardiaCertificacion:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_certificacion
 *       properties:
 *         id_usuario:
 *           type: number
 *           description: The id of the usuario
 *         id_certificacion:
 *           type: number
 *           description: The id of the certificacion
 *         fecha_vencimiento:
 *           type: string
 *           format: date
 *           description: The expiration date of the certificacion
 *       example:
 *         id_usuario: 1
 *         id_certificacion: 1
 *         fecha_vencimiento: "2026-11-20"
 */

export const guardiaCertificacionRouter = (controller: GuardiaCertificacionController) => {
    const router = Router();

    /**
     * @swagger
     * /guardias-certificaciones:
     *   post:
     *     summary: Create a new guardia certificacion
     *     tags: [GuardiasCertificaciones]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/GuardiaCertificacion'
     *     responses:
     *       201:
     *         description: The guardia certificacion was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/GuardiaCertificacion'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /guardias-certificaciones/{id_usuario}:
     *   get:
     *     summary: Get the guardia certificacion by usuario id
     *     tags: [GuardiasCertificaciones]
     *     parameters:
     *       - in: path
     *         name: id_usuario
     *         schema:
     *           type: string
     *         required: true
     *         description: The usuario id
     *     responses:
     *       200:
     *         description: The guardia certificacion description by usuario id
     *         contens:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/GuardiaCertificacion'
     *       404:
     *         description: The guardia certificacion was not found
     */
    router.get('/:id_usuario', (req, res) => controller.findByUsuarioId(req, res));

    /**
     * @swagger
     * /guardias-certificaciones:
     *   get:
     *     summary: Returns the list of all the guardias certificaciones
     *     tags: [GuardiasCertificaciones]
     *     responses:
     *       200:
     *         description: The list of the guardias certificaciones
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/GuardiaCertificacion'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /guardias-certificaciones/{id_usuario}/{id_certificacion}:
     *  put:
     *    summary: Update the guardia certificacion by the id
     *    tags: [GuardiasCertificaciones]
     *    parameters:
     *      - in: path
     *        name: id_usuario
     *        schema:
     *          type: string
     *        required: true
     *        description: The usuario id
     *      - in: path
     *        name: id_certificacion
     *        schema:
     *          type: string
     *        required: true
     *        description: The certificacion id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/GuardiaCertificacion'
     *    responses:
     *      200:
     *        description: The guardia certificacion was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GuardiaCertificacion'
     *      404:
     *        description: The guardia certificacion was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id_usuario/:id_certificacion', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /guardias-certificaciones/{id_usuario}/{id_certificacion}:
     *   delete:
     *     summary: Remove the guardia certificacion by id
     *     tags: [GuardiasCertificaciones]
     *     parameters:
     *       - in: path
     *         name: id_usuario
     *         schema:
     *           type: string
     *         required: true
     *         description: The usuario id
     *       - in: path
     *         name: id_certificacion
     *         schema:
     *           type: string
     *         required: true
     *         description: The certificacion id
     *
     *     responses:
     *       204:
     *         description: The guardia certificacion was deleted
     *       404:
     *         description: The guardia certificacion was not found
     */
    router.delete('/:id_usuario/:id_certificacion', (req, res) => controller.delete(req, res));

    return router;
};
