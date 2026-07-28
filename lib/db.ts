import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


// export async function connectWithRetry(retries = 3,): Promise<void> {
//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       await prisma.$queryRaw`SELECT 1`;  //forces an actual round trip to the db
//       console.log(`Database connected successfully (attempt ${attempt})`);
//       return;
//     } catch (error) {
//       console.error(`DB connection attempt ${attempt} failed:`, error);
//       if (attempt === retries) {
//         throw new Error(
//           "Could not connect to the database after multiple attempts. Please check your DATABASE_URL."
//         );
//       }
//     }
//   }
// }