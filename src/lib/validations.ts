import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
