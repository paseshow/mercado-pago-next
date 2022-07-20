import { PrismaClient } from '@prisma/client'
import type { NextPage } from 'next'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

const Home: NextPage = () => {

  return (
    <div></div>
  )
}

export default Home