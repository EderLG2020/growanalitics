const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

class UserController {
  static async getUsuarios(req, res) {
    try {
      let { page = 1, limit = 10, search = "" } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      const [usuarios, total] = await Promise.all([
        prisma.usuario.findMany({
          skip,
          take: limit,
          where: {
            OR: [
              { usuario: { contains: search } },
              { correo: { contains: search } },
              {
                nombre: { contains: search },
              },
              {
                apell_paterno: { contains: search },
              },
              {
                apell_materno: { contains: search },
              },
            ],
          },
          orderBy: { id: "asc" },
        }),
        prisma.usuario.count({
          where: {
            OR: [
              { usuario: { contains: search } },
              { correo: { contains: search } },
              { nombre: { contains: search } },
              { apell_paterno: { contains: search } },
              { apell_materno: { contains: search } },
            ],
          },
        }),
      ]);

      res.json({
        data: usuarios,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener usuarios", details: error.message });
    }
  }

  static async createUsuario(req, res) {
    try {
      const { usuario, correo, nombre, apell_paterno, apell_materno, contrasena, tipo_usuario } =
        req.body;

      const nuevoUsuario = await prisma.usuario.create({
        data: {
          usuario,
          correo,
          nombre,
          apell_paterno,
          apell_materno,
          contrasena,
          tipo_usuario,
        },
      });

      res.status(201).json({ message: "Usuario creado con éxito", data: nuevoUsuario });
    } catch (error) {
      res.status(500).json({ error: "Error al crear usuario", details: error.message });
    }
  }

  static async updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const { usuario, correo, nombre, apell_paterno, apell_materno, contrasena, tipo_usuario } =
        req.body;

      const usuarioActualizado = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          usuario,
          correo,
          nombre,
          apell_paterno,
          apell_materno,
          contrasena,
          tipo_usuario,
        },
      });

      res.json({ message: "Usuario actualizado con éxito", data: usuarioActualizado });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar usuario", details: error.message });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      const { id } = req.params;

      await prisma.usuario.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar usuario", details: error.message });
    }
  }
}

module.exports = UserController;
