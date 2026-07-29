import * as transactionService from "../services/transaction.service.js";

export const create = async (req, res, next) => {
    console.log("===== TRANSACTION CONTROLLER =====");
  console.log(req.body);
  try {
    const result = await transactionService.create(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
}
};

export const getAll = async (req, res, next) => {
  try {
    const result = await transactionService.getAll(req.user.id, req.query);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
}
};

export const getById = async (req, res, next) => {
  try {
    const result = await transactionService.getById(
      req.params.id,
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

export const update = async (req, res, next) => {
  try {
    const result = await transactionService.update(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Transaction berhasil diupdate.",
      data: result,
    });

  } catch (err) {
    next(err);
}
};

export const remove = async (req, res, next) => {
  try {
    await transactionService.remove(
      req.params.id,
      req.user.id
    );

    res.json({
      success: true,
      message: "Transaction berhasil dihapus.",
    });

  } catch (err) {
    next(err);
}
};