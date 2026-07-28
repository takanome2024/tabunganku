import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // ambil token dari header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    // format: Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // simpan data user ke request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token expired atau tidak valid",
    });
  }
};