const { PrismaClient } = require("../src/generated/prisma/client");
const { faker } = require("@faker-js/faker");
const { hashPassword } = require("../src/config/hash");

const prisma = new PrismaClient();

async function main() {
  console.log("Generando usuarios fake...");

  console.time("Tiempo total");

  const usuarios = [];

  for (let i = 0; i < process.env.FAKER_GENERATE; i++) {
    const plainPassword = faker.internet.password({ length: 8 });
    const hashedPassword = await hashPassword(plainPassword);

    usuarios.push({
      usuario: faker.internet.username() + "_" + faker.string.uuid().slice(0, 5),
      correo: faker.internet
        .email()
        .replace("@", `_${faker.string.uuid().slice(0, 5)}@`),
      nombre: faker.person.firstName(),
      apell_paterno: faker.person.lastName(),
      apell_materno: faker.person.lastName(),
      contrasena: hashedPassword,
      tipo_usuario: faker.helpers.arrayElement(["admin", "editor", "viewer"]),
    });
  }

  await prisma.usuario.createMany({
    data: usuarios,
  });

  console.timeEnd("Tiempo total");
  console.log(process.env.FAKER_GENERATE," usuarios creados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
