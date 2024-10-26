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

// async function writeAiStream() {
//   try {
//     const result = (await hubAI().run("@cf/meta/llama-3.1-8b-instruct", {
//       prompt,
//       stream: true,
//     })) as ReadableStream;

//     for await (const chunk of result) {
//       const chunkString = new TextDecoder().decode(chunk).slice(6);
//       await eventStream.push(chunkString);
//     }
//   } catch (error) {
//     consola.error(error);

//     if (error instanceof Error) {
//       await eventStream.push(JSON.stringify({ error: error.message }));
//     }
//   } finally {
//     await eventStream.close();
//   }
// }

// event.waitUntil(writeAiStream());
