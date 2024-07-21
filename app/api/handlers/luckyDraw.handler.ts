import { createFactory } from "hono/factory";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { error } from "console";

const factory = createFactory();

const luckyDrawHandler = factory.createHandlers(async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL_ACCELERATE,
  }).$extends(withAccelerate());

  try {
    const { phoneNumber } = await c.req.json();

    // check if number exiests in already participated in the last 24 hours

    const existingDraw = await prisma.draw.findFirst({
      where: {
        phoneNumber: phoneNumber,
        drawDate: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (existingDraw) {
      return c.json({
        error: "You can only participate once every 24 hours.",
      });
    }

    // luckey draw logic

    const discountCoupons = ["20%", "10%", "5%"];

    const randomNumber = Math.random();

    let result = "";

    if (randomNumber < 0.3) {
      result = "Won A Free vish me coffee";
    } else if (randomNumber < 0.23) {
      result = "Won A Free cookie!";
    } else {
      result = `${
        discountCoupons[Math.floor(Math.random() * discountCoupons.length)]
      } Discount coupon`;
    }

    const draw = await prisma.draw.create({
      data: {
        phoneNumber: phoneNumber,
        result: result,
      },
    });

    return c.json({
      response: draw,
    });
  } catch (error: any) {
    console.log(error?.message);
    return c.json({
      error: error?.message,
    });
  }
});

export { luckyDrawHandler };
