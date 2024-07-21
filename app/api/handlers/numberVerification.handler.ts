import { createFactory } from "hono/factory";

const factory = createFactory();

const abstractApiKey = process.env.ABSTRACT_API_KEY;

const verifyNumberHandler = factory.createHandlers(async (c) => {
  try {
    const { phoneNumber } = await c.req.json();
    console.log({ phoneNumber: phoneNumber });
    // send otp
    const response = await fetch(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${abstractApiKey}&phone=${phoneNumber}`
    );

    if (!response.ok) {
      throw new Error("Not a valid number");
    }

    return c.json(
      {
        verified: true,
      },
      200
    );  
  } catch (error: any) {
    console.log();
    return c.json({
      error: error?.message,
    });
  }
});

export { verifyNumberHandler };
