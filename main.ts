import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  return new Response(`Hello from Deno! Path: ${url.pathname}`);
};

serve(handler, { port: 8000 });
