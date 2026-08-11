import { z } from "zod";

export type PaymentMethod = "QR" | "COD";

/** Removes unsafe characters from a transaction ID / UTR. */
export function sanitizeTransactionId(value: string): string {
  return value.replace(/[^A-Za-z0-9.\-_:/ ]/g, "").trim();
}

const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+?91|0)?[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
});

const addressSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Enter your house / building and street / area")
    .max(300, "Address is too long"),
  city: z.string().trim().min(2, "Enter your city").max(60, "City is too long"),
  state: z
    .string()
    .trim()
    .min(2, "Enter your state")
    .max(60, "State is too long"),
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit pincode"),
  landmark: z
    .string()
    .trim()
    .max(120, "Landmark is too long")
    .optional()
    .default(""),
});

const itemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(20, "Quantity must be between 1 and 20"),
});

export const orderFormSchema = z
  .object({
    customer: customerSchema,
    address: addressSchema,
    paymentMethod: z.enum(["QR", "COD"]),
    transactionId: z.string().default(""),
    items: z
      .array(itemSchema)
      .min(1, "Your cart is empty. Add products before checkout."),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "QR") {
      const sanitized = sanitizeTransactionId(data.transactionId);
      if (sanitized.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["transactionId"],
          message:
            "Enter the Transaction ID / UTR you received after paying (at least 6 characters)",
        });
      } else if (sanitized.length > 60) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["transactionId"],
          message: "Transaction ID is too long (max 60 characters)",
        });
      }
    }
  });

export type OrderFormValues = z.infer<typeof orderFormSchema>;
