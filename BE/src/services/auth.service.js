import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const login = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // LOG 1: Cek apakah user ketemu di database
  console.log("Data User dari DB:", user ? "Ada" : "Kosong (Null)");

  if (!user) {
    throw new Error("Gagal: User tidak ditemukan di DB.");
  }

  // LOG 2: Cek isi password sebelum di-compare
  console.log("Password dari Postman:", password); 
  console.log("Password dari DB:", user.password); 

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  // LOG 3: Lihat hasil dari bcrypt
  console.log("Hasil bcrypt.compare:", validPassword);

  if (!validPassword) {
    throw new Error("Gagal: Password tidak cocok.");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      displayName: user.displayName,
      role: user.role,
    },
  };
};

export const register = async (username, password) => {
  // Cek apakah username sudah ada
  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  console.log(
    "Cek User Register:",
    existingUser ? "Username sudah ada" : "Username tersedia"
  );

  if (existingUser) {
    throw new Error("Username sudah digunakan.");
  }

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Password sebelum hash:", password);
  console.log("Password setelah hash:", hashedPassword);

  // Simpan user baru
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    username: user.username,
  };
};