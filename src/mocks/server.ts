import { handlers } from "./handlers.ts";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});
