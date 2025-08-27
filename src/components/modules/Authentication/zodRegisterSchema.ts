import z from "zod";

export const RiderSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      "Enter a valid BD phone (e.g. 01712345678)"
    ),
});

export const DriverSchema = RiderSchema.extend({
  drivingLicense: z
    .string()
    .regex(/^DL-\d{4}-\d{6}$/, "Format: DL-2025-123456"),
  vehicleInfo: z.object({
    model: z.string().min(2, "Vehicle model required"),
    license: z.string().regex(/^[A-Z]{3}-\d{6}$/, "Format: DHA-123456"),
  }),
});

export const schemaFor = (role: string) =>
  role === "driver" ? DriverSchema : RiderSchema;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
