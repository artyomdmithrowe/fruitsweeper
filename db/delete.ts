import { kv } from "./kv.ts";

export async function delete_games(name, id) {
  await kv.delete([name, id]);
}
