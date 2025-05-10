import { kv } from "./kv.ts";
import { levels_by_name } from "./scheme.ts";

export async function insert_games(data) {
  const id = crypto.randomUUID();

  const insert_result = await kv.set(["results", id], {
    id,
    ...data,
    level_code: levels_by_name[data.level] || 0,
  });
}
