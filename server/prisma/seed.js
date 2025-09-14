const { PrismaClient } = require("../src/generated/prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {

  const usuarios = [];

  for (let i = 0; i < 300; i++) {
    usuarios.push({
    usuario: faker.internet.userName() + "_" + faker.string.uuid().slice(0, 5),
    correo: faker.internet.email().replace("@", `_${faker.string.uuid().slice(0,5)}@`),
      nombre: faker.person.firstName(),
      apell_paterno: faker.person.lastName(),
      apell_materno: faker.person.lastName(),
      contrasena: faker.internet.password(),
      tipo_usuario: faker.helpers.arrayElement(["admin", "editor", "viewer"]),
    });
  }

  await prisma.usuario.createMany({
    data: usuarios,
  });

  console.log("✅ 300 usuarios creados con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
