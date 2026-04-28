import type { SecurityHeaders } from "@harpiats/core";

const isDevelopment = process.env.ENV === "development";
const extraScriptSrc = isDevelopment ? ["'unsafe-inline'"] : [];

export const shield: SecurityHeaders = {
  useNonce: true,
  contentSecurityPolicy: {
    directives: {
      "script-src": [...extraScriptSrc, "'self'"],
    },
  },
};
