# 📘 Examen Técnico - Growanalytics

## Autor
- **Eder Llancari Guerra**

---

##  Índice

1. [Introducción](#introducción)  
2. [Prueba Técnica](#prueba-técnica)  
   - [Tabla de Usuarios (Prisma)](#tabla-de-usuarios-prisma)  
   - [Funciones](#funciones)  
   - [Deseable](#deseable)  
3. [Skills & Tech Stack](#skills--tech-stack)  
4. [Instalación](#instalación)  
5. [Prisma](#prisma)  
6. [Seeds & Limpieza](#generar-datos-de-usuarios-seed)  
7. [Tests](#ejecutar-tests)  
8. [Correr Aplicación](#correr-aplicacion)  
9. [Variables de Entorno](#variables-de-entorno)  
10. [Scripts](#script-de-arranque)  
11. [Correr en Docker](#correr-en-docker)  
12. [Logs Útiles](#logs-útiles)  
13. [Swagger](#documentación-en-swagger)  
14. [Demo del Proyecto](#demo-del-proyecto)
15. [Licencia](#licencia)

---

## Introducción

Gracias por participar en esta convocatoria para la empresa **Grow Analytics**.  
Esta prueba técnica evalúa tus habilidades como **Full Stack Developer**, utilizando tecnologías como:  

- **ReactJS, NodeJS, Redux, ExpressJS, Prisma, Swagger, MySQL, Jest, Docker**  

Tu responsabilidad será desarrollar plataformas **desde cero**, gestionando todo el ciclo de desarrollo.  

 **Plazo máximo de entrega:** *martes 12 de noviembre*  

---

## Prueba Técnica

El reto consiste en crear un proyecto con:

- **Frontend:** ReactJS  
- **Backend:** NodeJS (ExpressJS)  
- **Base de datos:** MySQL (Dockerizado)  

👉 No es obligatorio usar JSX, se puede trabajar con **JS plano**.  

---

##  Tabla de Usuarios (Prisma)

| Campo         | Tipo     |
|---------------|----------|
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

##  Funciones

###  Tabla 1 (Usuarios)
- [x] Mostrar columnas: **ID, usuario, correo, nombre completo, acciones**.  
- [x] Paginación de 10 registros.  
- [x] Ordenar por columnas.  
- [x] Filtros por columna (ícono de lupa).  
- [x] Buscador en **nombre completo**.  
- [x] Editar y eliminar registro.  
- [x] Modal de edición con datos precargados.  

###  Tabla 2 (Usuarios)
- [x] Mostrar columnas: **ID, usuario, tipo_usuario, acciones**.  
- [x] Paginación de 10 registros.  
- [x] Ordenar por columnas.  
- [x] Filtros por columna.  
- [x] Edición en línea (sin modal).  
- [x] Eliminar registro.  

---

##  Deseable
- [x] APIs documentadas con **Swagger**.  
- [x] Pruebas unitarias en **Jest** (backend).  
- [ ] Pruebas unitarias (frontend).  
- [x] Crear usuario con contraseña.  
- [ ] Mostrar **Tabla 2** solo a roles específicos.  
- [x] Uso de **TailwindCSS**.  
- [x] Dark & Light mode.  

---

##  Skills & Tech Stack

| Category     | Technology |
|--------------|------------|
| **Frontend** | ReactJS `19.1.1` · Redux `9.2.0` · TailwindCSS `4.1.13` · Ant Design `5.27.3` |
| **Backend**  | NodeJS `22.19.0` · ExpressJS `5.1.0` · Prisma `6.16.1` · JWT `9.0.2` |
| **Database** | MariaDB `10.11.5` |
| **API Docs** | Swagger `6.2.8` |
| **Testing**  | Jest |
| **DevOps**   | Docker `20.10.25` |

---

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/EderLG2020/growanalitics.git
cd growanalitics

# Crear archivo de entorno
mv .env.example .env

# Instalar dependencias cliente
cd client && npm i
npm run dev

# Instalar dependencias servidor
cd server && npm i
npx prisma db pull
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

## PRISMA
Prisma es un ORM (Object-Relational Mapping) moderno para Node.js y TypeScript que facilita la interacción con bases de datos relacionales como MySQL, PostgreSQL, SQL Server, SQLite y también con MongoDB.

En lugar de escribir queries SQL manuales, Prisma permite trabajar con un cliente autogenerado que ofrece tipado estático, autocompletado y validación en tiempo de compilación.

Ventajas de usar Prisma

✅ Autocompletado en el editor (VSCode, WebStorm).

✅ Queries más seguras y con validación de tipos.

✅ Gestión sencilla de migraciones de la base de datos.

✅ Compatibilidad con múltiples bases de datos.

✅ Generación de un cliente optimizado.

✅ Prisma Studio para administración visual de datos.

# Crear la base de datos shadow

```sql

CREATE DATABASE IF NOT EXISTS growanalitics_shadow;

GRANT ALL PRIVILEGES ON growanalitics_shadow.* TO 'prisma'@'%';

FLUSH PRIVILEGES;
```



---

## Generar datos de usuarios (seed)
```bash
npm run seed
```

---

## Ejecutar tests
```bash
npm test
```

---

## Limpiar la base de datos
```bash
npm run clean
```

---

##  Correr aplicación
```bash
npm run dev
```

---

##  Variables de entorno

###  SERVER (.env)
- `DATABASE_URL` → cadena de conexión DB  
- `SHADOW_DATABASE_URL` → DB shadow para migraciones  
- `JWT_SECRET` → clave para JWT  
- `FAKER_GENERATE` → cantidad de usuarios a generar  
- `NODE_ENV` → entorno (production/development)  
- `SALT_ROUNDS` → saltos de encriptación  

###  CLIENTE (.env)
- `VITE_API_URL` → endpoint de la API  

---

##  Script de arranque
```json
"scripts": {
  "test": "jest",
  "seed": "node prisma/seed.js",
  "clean": "node prisma/clean.js",
  "dev": "npx prisma db pull && node ./src/server.js"
}
```

---

#  CORRER EN DOCKER

### 🔹 Construir & levantar contenedores
```bash
docker-compose up -d --build
```

### 🔹 Migraciones Prisma
```bash
docker exec -it grow_server npx prisma migrate dev
```

### 🔹 Seed (200 usuarios)
```bash
docker exec -it grow_server npm run seed
```

### 🔹 Limpiar DB
```bash
docker exec -it grow_server npm run clean
```

---

# LOGS ÚTILES

- **Backend**
```bash
docker logs -f grow_server
```

- **Frontend**
```bash
docker logs -f grow_client
```

- **Database**
```bash
docker logs -f grow_db
```

*(salir con `Ctrl + C`)*  

---

#  DOCUMENTACIÓN EN SWAGGER

Disponible en:  
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

#  DEMO DEL PROYECTO

### Login  
![Login](https://i.ibb.co/Pzr1gkPv/login.png)  

### Signup  
![Signup](https://i.ibb.co/d0HvJP9j/Screenshot-2025-09-15-23-00-43.png)  

---

## 🌞 Modo Claro  

### Tabla 1  
![Tabla 1 Light](https://i.ibb.co/q3cFMsjB/Screenshot-2025-09-15-22-55-16.png)  

### Tabla 2  
![Tabla 2 Light](https://i.ibb.co/JwrpyXRw/Screenshot-2025-09-15-22-58-46.png)  

---

## 🌙 Modo Oscuro  

### Tabla 1  
![Tabla 1 Dark](https://i.ibb.co/5XYkvS2g/tabla1.png)  

### Tabla 2  
![Tabla 2 Dark](https://i.ibb.co/ksWwBcHG/Screenshot-2025-09-15-22-56-23.png)  

---

## 📖 Documentación API  

![Swagger Docs](https://i.ibb.co/8nfrsCcD/Screenshot-2025-09-15-22-57-10.png)  

---


# Licencia
Este proyecto está bajo la licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
