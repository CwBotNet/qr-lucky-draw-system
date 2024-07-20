import { Hono } from "hono";
import { handle } from "hono/vercel";
export const runtime = "edge";

const app = new Hono<{
  Bindings: {
    DATABASE_URL_ACCELERATE: string;
  };
}>().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    DATABASE_URL_ACCELERATE: process.env.DATABASE_URL_ACCELERATE,
    DATABASE_URL: process.env.DATABASE_URL,
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);
