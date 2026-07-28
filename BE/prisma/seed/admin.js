import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      fullName: "Galang Rambu Anarki",
      displayName: "Galang",
      username: "galang",
      password,
      role: "ADMIN",
    },
  });

  console.log("Super Admin Created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });