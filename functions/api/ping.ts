export interface PagesContext<TEnv = Record<string, unknown>> {
  request: Request;
  env: TEnv;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}

export type PagesFunction<TEnv = Record<string, unknown>> = (
  context: PagesContext<TEnv>
) => Response | Promise<Response>;

interface Env {
  PING_MESSAGE?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const ping = context.env.PING_MESSAGE || "ping from Cloudflare Pages";
  return new Response(JSON.stringify({ message: ping }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
};
