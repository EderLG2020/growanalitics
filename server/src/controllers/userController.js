const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwt");

class UserController {
  static async getUsuarios(req, res) {
    try {
      let {
        page = 1,
        limit = 10,
        view = "general",
        search = "",
        usuario = "",
        tipo_usuario = "",
        sortField = "id",
        sortOrder = "ascend",
      } = req.query;
  
      page = parseInt(page);
      limit = parseInt(limit);
      const skip = (page - 1) * limit;
  
      let where = {};
      if (view === "general") {
        if (search) {
          const terms = search.trim().split(/\s+/);
      
          if (terms.length === 1) {
            where = {
              OR: [
                { nombre: { contains: terms[0] } },
                { apell_paterno: { contains: terms[0] } },
                { apell_materno: { contains: terms[0] } },
              ],
            };
          }
          else if (terms.length === 2) {
            where = {
              AND: [
                { nombre: { contains: terms[0]} },
                { apell_paterno: { contains: terms[1] } },
              ],
            };
          } else if (terms.length >= 3) {
            where = {
              AND: [
                { nombre: { contains: terms[0] }},
                { apell_paterno: { contains: terms[1]}},
                { apell_materno: { contains: terms.slice(2).join(" ") } },
              ],
            };
          }
        }
      }
      else if (view === "roles") {
        where = {
          AND: [
            usuario ? { usuario: { contains: usuario } } : {},
            tipo_usuario ? { tipo_usuario: { contains: tipo_usuario } } : {},
          ],
        };
      }
  
      let prismaOrder = "asc";
      if (sortOrder === "descend" || sortOrder === "desc") prismaOrder = "desc";
      if (sortOrder === "ascend" || sortOrder === "asc") prismaOrder = "asc";
  
      let orderBy = { id: "asc" };
  
      if (sortField) {
        if (sortField === "nombre_completo") {
          orderBy = [
            { nombre: prismaOrder },
            { apell_paterno: prismaOrder },
            { apell_materno: prismaOrder },
          ];
        } else {
          orderBy = { [sortField]: prismaOrder };
        }
      }
  
      const [usuarios, total] = await Promise.all([
        prisma.usuario.findMany({
          skip,
          take: limit,
          where,
          orderBy,
          select:
            view === "general"
              ? {
                  id: true,
                  usuario: true,
                  correo: true,
                  nombre: true,
                  apell_paterno: true,
                  apell_materno: true,
                }
              : {
                  id: true,
                  usuario: true,
                  tipo_usuario: true,
                },
        }),
        prisma.usuario.count({ where }),
      ]);
  
      let data = usuarios;
      if (view === "general") {
        data = usuarios.map((u) => ({
          id: u.id,
          usuario: u.usuario,
          correo: u.correo,
          nombre_completo: `${u.nombre} ${u.apell_paterno} ${u.apell_materno}`,
        }));
      }
  
      res.json({
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error("❌ Error en getUsuarios:", error);
      res.status(500).json({
        error: "Error al obtener usuarios",
        details: error.message,
      });
    }
  }
  

  static async createUsuario(req, res) {
    try {
      const { usuario, correo, nombre, apell_paterno, apell_materno, contrasena, tipo_usuario } =
        req.body;

      if (!contrasena || contrasena.length < 4) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres" });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const nuevoUsuario = await prisma.usuario.create({
        data: {
          usuario,
          correo,
          nombre,
          apell_paterno,
          apell_materno,
          contrasena: hashedPassword,
          tipo_usuario,
        },
      });

      const { contrasena: _, ...userSinPassword } = nuevoUsuario;

      res.status(201).json({ message: "Usuario creado con éxito", data: userSinPassword });
    } catch (error) {
      if (error.code === "P2002") {
        const field = error.meta?.target?.includes("usuario")
          ? "usuario"
          : "correo";
        return res.status(400).json({ error: `El ${field} ya está registrado` });
      }

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

  static async login(req, res) {
    try {
      const { usuario, correo, contrasena } = req.body;
  
      const user = await prisma.usuario.findFirst({
        where: { OR: [{ usuario }, { correo }] },
      });
  
      if (!user) return res.status(400).json({ error: "Usuario o correo no encontrado" });
  
      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });
  
      const token = generateToken({ id: user.id, usuario: user.usuario, rol: user.tipo_usuario });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });
  
      const { contrasena: _, ...userSinPassword } = user;
      res.json({ message: "Login exitoso", user: userSinPassword });
    } catch (error) {
      res.status(500).json({ error: "Error en login", details: error.message });
    }
  }

  static async logout(req, res) {
    res.clearCookie("token");
    res.json({ message: "Sesión cerrada con éxito" });
  }
  
}

module.exports = UserController;
