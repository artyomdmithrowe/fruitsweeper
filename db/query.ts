import { kv } from "./kv.ts";

export async function get_games() {
  const entries = kv.list({ prefix: ["results"] });
  const results = [];

  for await (const entry of entries) {
    results.push(entry.value);
  }

  return results;
}
