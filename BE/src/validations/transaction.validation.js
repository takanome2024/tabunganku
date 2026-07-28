import { z } from "zod";

export const createTransactionSchema = z.object({
  periodId: z
    .number({
      required_error: "Period wajib dipilih.",
    })
    .int()
    .positive(),

  transactionType: z.enum(["DEPOSIT", "WITHDRAW"], {
    errorMap: () => ({
      message: "Transaction Type tidak valid.",
    }),
  }),

  amount: z
    .number({
      required_error: "Nominal wajib diisi.",
    })
    .positive("Nominal harus lebih dari 0."),

  remarks: z.string().max(255).optional(),
});

export const updateTransactionSchema = createTransactionSchema;