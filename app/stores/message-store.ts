import { z } from "zod";

export const useMessageStore = defineStore("messages", () => {
  const messages = ref<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  async function send(content: string) {
    messages.value.push({
      role: "user",
      content,
    });

    const response = fetchAi("/api/chat", messages.value);

    for await (const chunk of response) {
      const lastMessage = messages.value[messages.value.length - 1];

      if (lastMessage?.role === "user") {
        messages.value.push({
          role: "assistant",
          content: chunk,
        });

        continue;
      }

      lastMessage!.content += chunk;
    }
  }

  return {
    messages,
    send,
  };
});

async function* fetchAi(
  url: string,
  messages: { role: "user" | "assistant"; content: string }[]
) {
  const response = await $fetch(url, {
    method: "POST",
    body: {
      messages,
    },
    responseType: "stream",
  });

  if (!(response instanceof ReadableStream)) {
    throw new Error("Expected a stream response");
  }

  let buffer = "";
  const reader = response.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      if (buffer.trim()) {
        console.warn("Stream ended with unparsed data:", buffer);
      }
      return;
    }

    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const dataPrefix = "data: ";
      if (!line.startsWith(dataPrefix)) {
        continue;
      }

      const data = line.slice(dataPrefix.length).trim();
      if (data === "[DONE]") {
        return;
      }

      try {
        const { response } = messageSchema.parse(JSON.parse(data));
        yield response;
      } catch (error) {
        console.warn("Failed to parse message:", error);
      }
    }
  }
}

const messageSchema = z.object({
  response: z.string(),
});
