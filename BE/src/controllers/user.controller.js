import * as userService from "../services/user.service.js";

export const profile = async (req, res) => {
  try {
    const result = await userService.profile(req.user.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};