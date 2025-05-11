import { kv } from "./kv.ts";
import { get_games } from "./query.ts";

export async function delete_games(name, id) {
  await kv.delete([name, id]);
}

export async function delete_all_games() {
  const data = await get_games();

  data.forEach((item) => {
    console.log(item);
    delete_games("results", item.id);
  });
}
