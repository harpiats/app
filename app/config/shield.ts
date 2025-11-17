import { Shield } from "harpiats/shield";
import type { Harpia } from "harpiats";

const isDevelopment = process.env.ENV === "development";
const extraScriptSrc = isDevelopment ? ["'unsafe-inline'"] : [];

const instance = new Shield({
  useNonce: true,
  contentSecurityPolicy: {
    directives: {
      "script-src": [...extraScriptSrc, "'self'"],
    },
  },
});

export const shield = {
  middleware: (server: Harpia) => instance.middleware(server),
  instance,
};
