import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function createUsers() {
  const hashedPassword = await hash('123456', 6)

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin Geral',
        email: 'admin@ideasales.com.br',
        password: hashedPassword,
        verified: true,
        role: 'ADMIN',
      },
      {
        name: 'Vendedor Representante',
        email: 'vendas@ideasales.com.br',
        password: hashedPassword,
        verified: true,
        role: 'SALES',
      },
    ],
  })
}

async function seed() {
  await createUsers()
}

seed().then(() => {
  console.log('Database seeded!')
})
