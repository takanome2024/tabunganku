import * as dashboardService from "../services/dashboard.service.js";

export const summary = async (req, res) => {
  try {
    const result = await dashboardService.summary(req.user.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};