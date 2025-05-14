import { kv } from "./kv.ts";

export async function insert_games(data) {
  if (
    data.time < 0 ||
    data.username.length > 15 ||
    data.efficiency > 1 ||
    data.date.length > 6
  ) {
    throw new TypeError();
  }

  const id = crypto.randomUUID();
  const insert_result = await kv.set(["results", id], {
    id,
    ...data,
  });
}
