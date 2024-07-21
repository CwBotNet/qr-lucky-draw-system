import { Hono } from "hono";
import { handle } from "hono/vercel";
import { luckyDrawHandler, verifyNumberHandler } from "../handlers";

export const runtime = "edge";

const app = new Hono<{
  Bindings: {
    DATABASE_URL_ACCELERATE: string;
  };
}>().basePath("/api");

app.get("/health-check", async (c) => {
  return c.json({
    message: "working server!",
  });
});

app.post("/verify-number", ...verifyNumberHandler);
app.post("/lucky-draw", ...luckyDrawHandler);

export const GET = handle(app);
export const POST = handle(app);
