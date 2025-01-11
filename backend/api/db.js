import { PrismaClient } from "@prisma/client";

let prisma;

// Ensure we instantiate only one PrismaClient instance in development to avoid issues with hot-reloading.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
