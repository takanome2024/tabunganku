import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const result = await authService.login(
      req.body.username,
      req.body.password
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);

    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};


export const register = async (req, res) => {
  console.log("REGISTER HIT");

  try {
    const result = await authService.register(
      req.body.username,
      req.body.password
    );

    res.status(201).json({
      success: true,
      data: result,
    });

  } catch (err) {
  console.error(err);

  if (err.message === "Username sudah digunakan.") {
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
}
};