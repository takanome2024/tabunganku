import * as dashboardService from "../services/dashboard.service.js";

export const summary = async (req, res, next) => {
  try {
    const result = await dashboardService.summary(
      req.user.id
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};