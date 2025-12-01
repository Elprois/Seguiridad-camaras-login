import { Router } from 'express';
import { EquipoCatalogoController } from './equipo-catalogo.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     EquipoCatalogo:
 *       type: object
 *       required:
 *         - id_equipo
 *         - nombre_equipo
 *         - modelo
 *       properties:
 *         id_equipo:
 *           type: number
 *           description: The auto-generated id of the equipo catalogo
 *         nombre_equipo:
 *           type: string
 *           description: The name of the equipo
 *         modelo:
 *           type: string
 *           description: The model of the equipo
 *       example:
 *         id_equipo: 1
 *         nombre_equipo: "Radio"
 *         modelo: "Motorola"
 */

export const equipoCatalogoRouter = (controller: EquipoCatalogoController) => {
    const router = Router();

    /**
     * @swagger
     * /equipos-catalogo:
     *   post:
     *     summary: Create a new equipo catalogo
     *     tags: [EquiposCatalogo]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EquipoCatalogo'
     *     responses:
     *       201:
     *         description: The equipo catalogo was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EquipoCatalogo'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /equipos-catalogo/{id}:
     *   get:
     *     summary: Get the equipo catalogo by id
     *     tags: [EquiposCatalogo]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The equipo catalogo id
     *     responses:
     *       200:
     *         description: The equipo catalogo description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EquipoCatalogo'
     *       404:
     *         description: The equipo catalogo was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /equipos-catalogo:
     *   get:
     *     summary: Returns the list of all the equipos catalogo
     *     tags: [EquiposCatalogo]
     *     responses:
     *       200:
     *         description: The list of the equipos catalogo
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/EquipoCatalogo'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /equipos-catalogo/{id}:
     *  put:
     *    summary: Update the equipo catalogo by the id
     *    tags: [EquiposCatalogo]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The equipo catalogo id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/EquipoCatalogo'
     *    responses:
     *      200:
     *        description: The equipo catalogo was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/EquipoCatalogo'
     *      404:
     *        description: The equipo catalogo was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /equipos-catalogo/{id}:
     *   delete:
     *     summary: Remove the equipo catalogo by id
     *     tags: [EquiposCatalogo]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The equipo catalogo id
     *
     *     responses:
     *       204:
     *         description: The equipo catalogo was deleted
     *       404:
     *         description: The equipo catalogo was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
