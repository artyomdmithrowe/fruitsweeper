import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const html = await Deno.readTextFile("./index.html");
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};

serve(handler, { port: 8000 });
