import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const sql: NeonQueryFunction<boolean, boolean> = neon(
  process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder"
);

export const db = drizzle(sql); 