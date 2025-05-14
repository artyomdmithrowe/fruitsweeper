import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

import { insert_games } from "./db/insert.ts";
import { get_games } from "./db/query.ts";
import { delete_all_games } from "./db/delete.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const handler = async (req) => {
  console.log(1);
  delete_all_games();
  const url = new URL(req.url);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: new Headers(corsHeaders) });
  }

  let filePath = url.pathname === "/" ? "/index.html" : url.pathname;

  if (url.pathname === "/api/results") {
    try {
      if (req.method === "GET") {
        const results = await get_games();
        return Response.json(results, { headers: corsHeaders });
      }

      if (req.method === "POST") {
        const data = await req.json();
        await insert_games(data);
        return new Response("OK", { headers: new Headers(corsHeaders) });
      }
    } catch (error) {
      console.error("API Error:", error);
      return Response.json(
        { error: "Internal Server Error" },
        { status: 500, headers: corsHeaders }
      );
    }
  }

  try {
    const file = await Deno.readFile(`.${filePath}`);

    return new Response(file, {
      headers: {
        "Content-Type": getContentType(filePath),
        ...corsHeaders,
      },
    });
  } catch {
    return new Response("Not Found", {
      status: 404,
      headers: new Headers(corsHeaders),
    });
  }
};

function getContentType(path) {
  const ext = path.split(".").pop()?.toLowerCase() || "";

  const types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ts: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    svg: "image/svg+xml",
  };

  return types[ext] || "text/plain";
}

serve(handler, {
  port: 8000,
  onListen({ port }) {
    console.log(`Server started at http://localhost:${port}`);
  },
});
