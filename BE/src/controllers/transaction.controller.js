import * as transactionService from "../services/transaction.service.js";

export const create = async (req, res, next) => {
  try {
    const result = await transactionService.create(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Transaction berhasil dibuat.",
      data: result,
    });

  } catch (err) {
    next(err);
  }
};


export const getAll = async (req, res, next) => {
  try {
    const result = await transactionService.getAll(
      req.user.id,
      req.query
    );

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
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

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (err) {
    next(err);
  }
};


export const update = async (req, res, next) => {
  try {
    const result = await transactionService.updateTransaction(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Transaction berhasil diperbarui.",
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

    res.status(200).json({
      success: true,
      message: "Transaction berhasil dihapus.",
    });

  } catch (err) {
    next(err);
  }
};