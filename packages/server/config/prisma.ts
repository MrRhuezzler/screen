import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = (global.prisma) ? global.prisma : new PrismaClient()
global.prisma = prisma

async function connectDB(): Promise<void> {
    try {
        await prisma.$connect()
        console.log('Database connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

export default connectDB
