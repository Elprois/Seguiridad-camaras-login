import { Router } from 'express';
import { ZonaController } from './zona.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Zona:
 *       type: object
 *       required:
 *         - id_zona
 *         - nombre_zona
 *       properties:
 *         id_zona:
 *           type: number
 *           description: The auto-generated id of the zona
 *         nombre_zona:
 *           type: string
 *           description: The name of the zona
 *       example:
 *         id_zona: 1
 *         nombre_zona: "Sector A-01"
 */

export const zonaRouter = (controller: ZonaController) => {
    const router = Router();

    /**
     * @swagger
     * /zonas:
     *   post:
     *     summary: Create a new zona
     *     tags: [Zonas]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Zona'
     *     responses:
     *       201:
     *         description: The zona was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Zona'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /zonas/{id}:
     *   get:
     *     summary: Get the zona by id
     *     tags: [Zonas]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The zona id
     *     responses:
     *       200:
     *         description: The zona description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Zona'
     *       404:
     *         description: The zona was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /zonas:
     *   get:
     *     summary: Returns the list of all the zonas
     *     tags: [Zonas]
     *     responses:
     *       200:
     *         description: The list of the zonas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Zona'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /zonas/{id}:
     *  put:
     *    summary: Update the zona by the id
     *    tags: [Zonas]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The zona id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Zona'
     *    responses:
     *      200:
     *        description: The zona was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Zona'
     *      404:
     *        description: The zona was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /zonas/{id}:
     *   delete:
     *     summary: Remove the zona by id
     *     tags: [Zonas]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The zona id
     *
     *     responses:
     *       204:
     *         description: The zona was deleted
     *       404:
     *         description: The zona was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
