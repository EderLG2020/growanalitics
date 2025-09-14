const { PrismaClient } = require("../src/generated/prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("- Limpiando base de datos...");

  await prisma.$executeRaw`TRUNCATE TABLE Usuario`;

  console.log("- Base de datos limpiada y contador de ID reiniciado ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
