import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Lakukan hashing pada password PLAIN TEXT
  const hashedPassword = await bcrypt.hash('Kmsg123$$$', 10);

  // Masukkan ke database menggunakan Prisma
  const user = await prisma.user.create({
    data: {
      username: 'galang',
      password: hashedPassword,
      fullName: 'Galang',
      displayName: 'Galang', // <-- TAMBAHKAN BARIS INI
    },
  });

  console.log('✅ User galang berhasil ditambahkan secara otomatis!');
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });