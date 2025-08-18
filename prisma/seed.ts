import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const administrador = await prisma.user.upsert({
    where: { email: 'adm@adm.com' },
    update: {},
    create: {
      email: 'adm@adm.com',
      name: 'Administrador',
      password: '$2a$10$n9W2aA9DVUEdRmDQGPijDO7q0A1O68dVJA3s1jfRozV0sa6oN9xFC',
    },
  })
  console.log({ administrador })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })