import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { messages } = await readValidatedBody(event, async (body) =>
    z
      .object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string(),
          })
        ),
      })
      .parse(body)
  );

  if (useRuntimeConfig().hub.remote) {
    await addNotesToMessages(messages);
  }

  const result = await hubAI().run("@cf/meta/llama-3.1-8b-instruct", {
    messages,
    stream: true,
    max_tokens: 500,
  });

  return sendStream(event, result as ReadableStream);
});

async function addNotesToMessages(messages: any[]) {
  const query = messages[messages.length - 1].content;

  const embeddings = await hubAI().run("@cf/baai/bge-base-en-v1.5", {
    text: [query],
  });
  const vectors = embeddings.data[0];

  const vectorQuery = await hubVectorize("notes").query(vectors, { topK: 1 });

  if (vectorQuery.count === 0) {
    throw createError({
      status: 500,
      message: "No matching vectors found",
    });
  }

  const noteIds = vectorQuery.matches.map(({ id }) => parseInt(id));

  const db = useDrizzle();

  const notes = await db.query.notes.findMany({
    where: inArray(tables.notes.id, noteIds),
  });

  messages.unshift({
    role: "system",
    content:
      "You are a helpful assistant that answers questions based on provided notes",
  });

  if (notes.length) {
    messages.push({
      role: "assistant",
      content:
        "The following notes where found\n" +
        notes.map((note) => `- *${note.title}*\n${note.content}`).join("\n"),
    });
  }
}
