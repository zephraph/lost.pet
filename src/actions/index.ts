import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const phoneRegex =
  /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
export const PhoneNumber = z.string().regex(phoneRegex, "Invalid phone number");

export const server = {
  reportLost: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: PhoneNumber,
      petType: z.enum(["dog", "cat", "other"]),
      lastSeen: z.coerce.date(),
      isChipped: z.boolean(),
    }),
    async handler(input) {
      console.log(input);
    },
  }),
  reportSeen: defineAction({
    input: z.object({
      name: z.string(),
      contact: z.union([z.string().email(), PhoneNumber]),
      photoId: z.string().nullable(),
      petType: z.enum(["dog", "cat", "other"]),
      lastSeen: z.coerce.date(),
      isChipped: z.boolean(),
    }),
    async handler(input) {
      console.log(input);
    },
  }),
};
