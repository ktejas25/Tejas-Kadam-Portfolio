import type { DemoResponse } from "../../shared/api";
import type { PagesFunction } from "./ping";

export const onRequestGet: PagesFunction = async () => {
  const response: DemoResponse = {
    message: "Hello from Cloudflare Edge Function",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
};
