const { Router } = require("express");
const UserController = require("../controllers/userController");

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener lista de usuarios con paginación y búsqueda
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de usuarios por página (por defecto 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para filtrar usuarios (por nombre, usuario, correo, appellido paterno y paterno.)
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       usuario:
 *                         type: string
 *                       correo:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       apell_paterno:
 *                         type: string
 *                       apell_materno:
 *                         type: string
 *                       tipo_usuario:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   example: 42
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 */

router.get("/", UserController.getUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario: { type: string }
 *               correo: { type: string }
 *               nombre: { type: string }
 *               apell_paterno: { type: string }
 *               apell_materno: { type: string }
 *               contrasena: { type: string }
 *               tipo_usuario: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 */
router.post("/", UserController.createUsuario);


/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 */

router.put("/:id", UserController.updateUsuario);

router.delete("/:id", UserController.deleteUsuario);

module.exports = router;
