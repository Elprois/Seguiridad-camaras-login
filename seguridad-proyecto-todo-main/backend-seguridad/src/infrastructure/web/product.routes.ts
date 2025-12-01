import { Router } from 'express';
import { ProductController } from './product.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - precio
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the product
 *         nombre:
 *           type: string
 *           description: The name of the product
 *         precio:
 *           type: number
 *           description: The price of the product
 *       example:
 *         id: 1
 *         nombre: "Laptop"
 *         precio: 1500
 */

export const productRouter = (controller: ProductController) => {
    const router = Router();

    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       201:
     *         description: The product was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /products/{id}:
     *   get:
     *     summary: Get the product by id
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The product id
     *     responses:
     *       200:
     *         description: The product description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         description: The product was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Returns the list of all the products
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: The list of the products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /products/{id}:
     *  put:
     *    summary: Update the product by the id
     *    tags: [Products]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The product id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Product'
     *    responses:
     *      200:
     *        description: The product was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Product'
     *      404:
     *        description: The product was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Remove the product by id
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The product id
     *
     *     responses:
     *       204:
     *         description: The product was deleted
     *       404:
     *         description: The product was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
