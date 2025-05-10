import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const path = new URL(req.url).pathname;
  let filePath = path === "/" ? "/index.html" : path;

  try {
    const file = await Deno.readFile(`.${filePath}`);
    const contentType = getContentType(filePath);

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
};

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  return "text/plain";
}

serve(handler, { port: 8000 });
