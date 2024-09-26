require('dotenv').config()
import {z} from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    SECRET: z.string()
})

export const ENV = envSchema.parse(process.env)