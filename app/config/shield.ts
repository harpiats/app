import { Shield } from "harpiats/shield";

const instance = new Shield({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "'unsafe-eval'"],
    },
  },
});

export const shield = instance.middleware;
