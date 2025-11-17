import harpia from "harpiats";
import routes from "./routes";

import { cors } from "app/config/cors";
import { shield } from "app/config/shield";
import { monitor } from "app/middlewares/monitor";
import { Observer } from "app/observers";
import { Tasks } from "app/tasks";
import { HotReload } from "app/lib/hot-reload";

const port = Number(process.env.PORT) || 3000;

export const app = harpia();

app.cors(cors);
app.setNotFound((_req, res) => res.status(404).json({ message: "Not Found" }));

app.use(shield.middleware(app));
app.use(monitor);

app.routes(routes);
app.listen(
  {
    port,
    development: process.env.ENV === "development" || true,
    reusePort: false,
    hostname: "0.0.0.0",
  },
  () => {
    console.log(`Server is running at http://localhost:${port}/`);

    // Start scheduled tasks
    Tasks.run();

    // Observer
    Observer.run();

    // Start Hot Reload (dev only)
    if (process.env.ENV === "development" && process.env.MODE === "fullstack") {
      HotReload.run();
    }
  },
);
