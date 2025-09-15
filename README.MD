# Examen Técnico Growanalytics

## Autor

- **Eder Llancari Guerra**

---

## ⚙️ Configuración de Base de Datos

´´´sql
CREATE USER 'prisma'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON growanalitics.\* TO 'prisma'@'localhost';
FLUSH PRIVILEGES;

GRANT ALL PRIVILEGES ON _._ TO 'root'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
´´´

---

## Skills

- ReactJS
- NodeJS **22.19.0**
- Redux
- ExpressJS
- Prisma
- Swagger
- MySQL
- Jest
- Docker

---

## Instalación

´´´bash

# Clonar repositorio

git clone https://github.com/EderLG2020/growanalitics.git

cd growanalitics

# Crear archivo de entorno

mv .env.example .env

# Instalar dependencias cliente

cd client
npm i

# Instalar dependencias servidor

cd server
npm i
´´´

---

## Generar datos de usuarios (seed)

´´´bash
npm run seed
´´´

---

## Ejecutar tests

´´´bash
npm test
´´´

---

## Introducción

Gracias por participar en esta convocatoria para la empresa **GROW ANALYTICS**.  
Esta prueba técnica está diseñada para evaluar tus habilidades como programador **Full Stack**, enfocándose en el uso de tecnologías como **ReactJS, NodeJS, Redux, ExpressJS, Prisma, Swagger, MySQL, Jest, Docker**, entre otras.

En el puesto, estarás encargado de desarrollar plataformas desde cero, por lo que necesitamos a alguien con experiencia y habilidades para gestionar todo el ciclo de desarrollo, desde la creación del frontend hasta la implementación del backend en un tiempo determinado.

**Plazo máximo de entrega: martes 12 de noviembre**

---

## Prueba Técnica

La prueba consiste en crear un proyecto desde cero donde:

- El lado **frontend** se maneje con **ReactJS**.
- El lado **backend** con **NodeJS (ExpressJS)**.
- Base de datos **MySQL levantada en un Docker**.

No es necesario utilizar **JSX**, se puede trabajar con **JS** normalmente.

---

## Tabla de Usuarios (Prisma)

| Campo         | Tipo     |
| ------------- | -------- |
| id            | INT      |
| usuario       | STRING   |
| correo        | STRING   |
| nombre        | STRING   |
| apell_paterno | STRING   |
| apell_materno | STRING   |
| contrasena    | STRING   |
| tipo_usuario  | STRING   |
| created_at    | DATETIME |
| updated_at    | DATETIME |

---

## Funciones

### Tabla 1 (Usuarios)

Usando **Ant Design**, mostrar los datos de la tabla `usuarios` con las siguientes características:

- [x] Mostrar columnas: **ID, usuario, correo, nombre completo (concatenación de nombre + apellidos), acciones (íconos de editar y eliminar)**.
- [x] Paginación de 10 datos (**backend + frontend**).
- [x] Ordenar por columnas.
- [x] Filtro por cada columna (ícono de lupa).
- [x] Paginador para mover páginas.
- [x] Buscador genérico en la columna **nombre completo**.
- [x] Editar y eliminar registro.
- [x] Al editar: mostrar un **modal con datos existentes** y permitir guardar cambios.

---

### Tabla 2 (Usuarios)

Otra tabla en **Ant Design** mostrando los datos de la tabla `usuarios`:

- [x] Mostrar columnas: **ID, usuario, tipo de usuario, acciones**.
- [x] Paginación de 10 datos (**backend + frontend**).
- [x] Ordenar por columnas.
- [x] Filtro por cada columna (ícono de lupa).
- [x] Paginador para mover páginas.
- [x] Editar y eliminar registro.
- [x] Edición en línea directamente en la tabla (**sin modal**).

---

## Deseable

- [x] APIs documentadas con **Swagger**.
- [ ] Pruebas unitarias en **Jest** para backend.
- [ ] Pruebas unitarias para frontend.
- [x] Crear usuario (con contraseña).
- [ ] Mostrar **Tabla 2** solo a un tipo de usuario específico (**manejo de roles y permisos**).
- [x] Usar **Tailwind** para maquetado y casos adicionales.
- [x] Implementar versión **dark & light**.

---
