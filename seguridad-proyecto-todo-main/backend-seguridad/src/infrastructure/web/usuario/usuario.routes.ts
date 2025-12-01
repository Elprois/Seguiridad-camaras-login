import { Router } from 'express';
import { UsuarioController } from './usuario.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_rol
 *         - username
 *         - password_hash
 *         - nombre
 *         - apellido
 *         - estado
 *       properties:
 *         id_usuario:
 *           type: number
 *           description: The auto-generated id of the usuario
 *         id_rol:
 *           type: number
 *           description: The id of the rol
 *         username:
 *           type: string
 *           description: The username of the usuario
 *         password_hash:
 *           type: string
 *           description: The password hash of the usuario
 *         nombre:
 *           type: string
 *           description: The name of the usuario
 *         apellido:
 *           type: string
 *           description: The last name of the usuario
 *         estado:
 *           type: string
 *           description: The state of the usuario
 *       example:
 *         id_usuario: 1
 *         id_rol: 1
 *         username: "admin"
 *         password_hash: "..."
 *         nombre: "Admin"
 *         apellido: "Admin"
 *         estado: "Activo"
 */

export const usuarioRouter = (controller: UsuarioController) => {
    const router = Router();

    /**
     * @swagger
     * /usuarios:
     *   post:
     *     summary: Create a new usuario
     *     tags: [Usuarios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Usuario'
     *     responses:
     *       201:
     *         description: The usuario was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Usuario'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /usuarios/{id}:
     *   get:
     *     summary: Get the usuario by id
     *     tags: [Usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The usuario id
     *     responses:
     *       200:
     *         description: The usuario description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Usuario'
     *       404:
     *         description: The usuario was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /usuarios:
     *   get:
     *     summary: Returns the list of all the usuarios
     *     tags: [Usuarios]
     *     responses:
     *       200:
     *         description: The list of the usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Usuario'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /usuarios/{id}:
     *  put:
     *    summary: Update the usuario by the id
     *    tags: [Usuarios]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The usuario id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Usuario'
     *    responses:
     *      200:
     *        description: The usuario was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Usuario'
     *      404:
     *        description: The usuario was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /usuarios/{id}:
     *   delete:
     *     summary: Remove the usuario by id
     *     tags: [Usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The usuario id
     *
     *     responses:
     *       204:
     *         description: The usuario was deleted
     *       404:
     *         description: The usuario was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
