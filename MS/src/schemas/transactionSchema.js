import { z } from "zod";

export const transactionSchema = z.object({
  period: z.string().min(1, "Periode wajib dipilih"),

  transactionType: z.string().min(1, "Transaction Type wajib dipilih"),

  amount: z
    .number({
      required_error: "Nominal wajib diisi",
    })
    .positive("Nominal harus lebih dari 0"),

  remarks: z.string().optional(),
});