// This service has one configured author scope; callers cannot select other users.
export function createMemoryStore({
  apiKey,
  userId,
  client,
  fetchImpl = globalThis.fetch,
} = {}) {
  let memoryClient = client;
  async function request(path, payload) {
    const response = await fetchImpl(`https://api.mem0.ai${path}`, {
      method: "POST",
      headers: {
        authorization: `Token ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Mem0 request failed.");
    return response.json();
  }
  async function configuredClient() {
    if (!userId || (!apiKey && !memoryClient))
      throw new Error(
        "Mem0 memory is not configured. Set MEM0_API_KEY and MEM0_USER_ID."
      );
    if (!memoryClient) {
      memoryClient = {
        add: (messages, { userId }) =>
          request("/v3/memories/add/", {
            messages,
            user_id: userId,
          }),
        search: (query, { filters, topK }) =>
          request("/v3/memories/search/", {
            query,
            filters,
            top_k: topK,
          }),
      };
    }
    return memoryClient;
  }
  function text(value) {
    if (typeof value !== "string" || !value.trim() || value.length > 4096) {
      throw new Error("Memory text must contain 1–4096 characters.");
    }
    return value.trim();
  }
  return {
    async add(content) {
      const message = text(content);
      const memory = await configuredClient();
      try {
        const results = await memory.add([{ role: "user", content: message }], {
          userId,
        });
        // Mem0 may queue extraction; submission is not confirmation of indexed storage.
        return { status: "submitted", results };
      } catch {
        throw new Error("Mem0 memory write failed.");
      }
    },
    async search(query) {
      const search = text(query);
      const memory = await configuredClient();
      try {
        const response = await memory.search(search, {
          filters: { user_id: userId },
          topK: 5,
        });
        if (!Array.isArray(response.results))
          throw new Error("Invalid Mem0 response");
        return response.results.slice(0, 5).map(({ id, memory, score }) => ({
          id,
          memory: typeof memory === "string" ? memory.slice(0, 4096) : "",
          score,
        }));
      } catch {
        throw new Error("Mem0 memory search failed.");
      }
    },
  };
}
