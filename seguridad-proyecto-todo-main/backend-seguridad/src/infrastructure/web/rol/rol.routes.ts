import { Router } from 'express';
import { RolController } from './rol.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       required:
 *         - id_rol
 *         - nombre_rol
 *       properties:
 *         id_rol:
 *           type: number
 *           description: The auto-generated id of the rol
 *         nombre_rol:
 *           type: string
 *           description: The name of the rol
 *       example:
 *         id_rol: 1
 *         nombre_rol: "Admin"
 */

export const rolRouter = (controller: RolController) => {
    const router = Router();

    /**
     * @swagger
     * /rols:
     *   post:
     *     summary: Create a new rol
     *     tags: [Rols]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Rol'
     *     responses:
     *       201:
     *         description: The rol was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Rol'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /rols/{id}:
     *   get:
     *     summary: Get the rol by id
     *     tags: [Rols]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The rol id
     *     responses:
     *       200:
     *         description: The rol description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Rol'
     *       404:
     *         description: The rol was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /rols:
     *   get:
     *     summary: Returns the list of all the rols
     *     tags: [Rols]
     *     responses:
     *       200:
     *         description: The list of the rols
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Rol'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /rols/{id}:
     *  put:
     *    summary: Update the rol by the id
     *    tags: [Rols]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The rol id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Rol'
     *    responses:
     *      200:
     *        description: The rol was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Rol'
     *      404:
     *        description: The rol was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /rols/{id}:
     *   delete:
     *     summary: Remove the rol by id
     *     tags: [Rols]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The rol id
     *
     *     responses:
     *       204:
     *         description: The rol was deleted
     *       404:
     *         description: The rol was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
