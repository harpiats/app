import harpia from "harpiats";
import routes from "./routes";

import { monitor } from "app/middlewares/monitor";
import { shield } from "app/middlewares/shield";
// import { Tasks } from "app/tasks";

const port = Number(process.env.PORT) || 3000;

export const app = harpia();

app.cors();
app.setNotFound((req, res) => res.status(404).json({ message: "Not Found" }));
app.use(shield());
app.use(monitor);
app.routes(routes);

app.listen(
  {
    port,
    development: true,
    reusePort: false,
    hostname: "localhost",
  },
  () => {
    console.log("Server is running at http://localhost:3000/");

    // Start scheduled tasks
    // Tasks.run();
  },
);
