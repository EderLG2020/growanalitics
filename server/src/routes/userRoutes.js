const { Router } = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listado paginado de usuarios
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
 *         name: view
 *         schema:
 *           type: string
 *           enum: [general, roles]
 *           default: general
 *         description: Define el tipo de vista de la tabla
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           enum: [id, usuario, correo, nombre_completo, tipo_usuario]
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ascend, descend]
 *           default: ascend
 *         description: Dirección del ordenamiento (el backend lo convierte a asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para filtrar usuarios (solo aplica en `view=general`, busca en nombre, apell_paterno, apell_materno)
 *       - in: query
 *         name: usuario
 *         schema:
 *           type: string
 *         description: Filtro por usuario (solo aplica en `view=roles`)
 *       - in: query
 *         name: tipo_usuario
 *         schema:
 *           type: string
 *         description: Filtro por tipo de usuario (solo aplica en `view=roles`)
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
 *                     oneOf:
 *                       - type: object
 *                         description: Vista general (view=general)
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           usuario:
 *                             type: string
 *                             example: juan123
 *                           correo:
 *                             type: string
 *                             example: juan@mail.com
 *                           nombre_completo:
 *                             type: string
 *                             example: Juan Pérez López
 *                       - type: object
 *                         description: Vista roles (view=roles)
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           usuario:
 *                             type: string
 *                             example: juan123
 *                           tipo_usuario:
 *                             type: string
 *                             example: admin
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

router.get("/",authMiddleware, UserController.getUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: |
 *       Permite registrar un nuevo usuario en la plataforma.
 *       - El **usuario** debe ser único (no puede estar registrado previamente).
 *       - El **correo** debe ser único (no puede estar registrado previamente).
 *       - La **contraseña** debe tener al menos 4 caracteres.
 *       - El campo **tipo_usuario** acepta únicamente los valores `admin`, `editor` o `viewer`.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - correo
 *               - contrasena
 *               - tipo_usuario
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario único para iniciar sesión.
 *                 example: juan123
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: |
 *                   Correo electrónico del usuario.  
 *                   Debe ser único en la plataforma.
 *                 example: juan@mail.com
 *               nombre:
 *                 type: string
 *                 description: Nombre real del usuario.
 *                 example: Juan
 *               apell_paterno:
 *                 type: string
 *                 description: Apellido paterno del usuario.
 *                 example: Pérez
 *               apell_materno:
 *                 type: string
 *                 description: Apellido materno del usuario.
 *                 example: López
 *               contrasena:
 *                 type: string
 *                 minLength: 4
 *                 description: Contraseña del usuario (mínimo 4 caracteres).
 *                 example: "abcd1234"
 *               tipo_usuario:
 *                 type: string
 *                 enum: [admin, editor, viewer]
 *                 description: Rol del usuario dentro de la plataforma.
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado con éxito
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     usuario:
 *                       type: string
 *                       example: juan123
 *                     correo:
 *                       type: string
 *                       example: juan@mail.com
 *                     tipo_usuario:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Error de validación (usuario o correo duplicado, contraseña inválida)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El usuario ya está registrado"
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

router.put("/:id", authMiddleware,UserController.updateUsuario);

router.delete("/:id",authMiddleware, UserController.deleteUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso con token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /usuarios/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     description: |
 *       Finaliza la sesión actual del usuario.  
 *       - Si usas **JWT en cookies (httpOnly)**, el servidor limpiará la cookie que almacena el token.  
 *       - Si usas **JWT en headers**, el cliente simplemente debe descartar el token.  
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Sesión cerrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada con éxito
 */

router.post("/logout", UserController.logout);

router.get("/me", authMiddleware, UserController.getCurrentUser);


module.exports = router;
