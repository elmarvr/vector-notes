import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { messages } = await readValidatedBody(event, async (body) =>
    z
      .object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      })
      .parse(body)
  );

  const result = (await hubAI().run("@cf/meta/llama-3.1-8b-instruct", {
    messages,
    stream: true,
  })) as ReadableStream;

  return sendStream(event, result);
});
