import type { DemoResponse } from "../shared/api";

export interface WorkerAssetFetcher {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export interface Env {
  ASSETS: WorkerAssetFetcher;
  PING_MESSAGE?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API: /api/ping
    if (url.pathname === "/api/ping") {
      const ping = env.PING_MESSAGE || "ping from Cloudflare Worker";
      return new Response(JSON.stringify({ message: ping }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    }

    // API: /api/demo
    if (url.pathname === "/api/demo") {
      const response: DemoResponse = {
        message: "Hello from Cloudflare Worker",
      };
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    }

    // Forward non-API requests to static asset binding with SPA routing
    return env.ASSETS.fetch(request);
  },
};
