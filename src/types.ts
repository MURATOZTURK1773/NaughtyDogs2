import { z } from "zod";

export type ActiveTab =
  | "favorited"
  | "unfavorited"
  | "none-selected"
  | "create dog";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;
