# Application

The Harpia Framework is built on top of the **Harpia Core**, which provides the foundational structure and utilities for the framework. For more details on the core functionalities, refer to the [Harpia Core Documentation](https://github.com/harpiats/core).

---

## Table of Contents
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Commands and Scaffold](#commands-and-scaffold)
- [Env](#env)
- [App Folder](#app)
- [Modules](#modules)
- [Mailer](#mailer)
- [Tasks and Jobs](#tasks-and-jobs)
- [S3](#s3)
- [Utilities](#utilities)
- [Authors](#authors)

---

## Installation

To install the dependencies for the Harpia Framework, run the following command:

```bash
bun install
```

---

## Folder Structure

The Harpia Framework follows a modular and organized folder structure to ensure scalability and maintainability. Below is the typical structure of a Harpia project:

```md
my-project/
│
├── app/
│   ├── commands/
│   ├── config/
│   ├── database/
│   ├── helpers/
│   ├── middlewares/
│   ├── observers/
│   ├── services/
│   ├── tasks/
│   ├── utils/
├── modules/
│   ├── system/
│       └── controllers/
│       └── services/
│       └── tests/
│       └── system.routes.ts
│   ├── user (example)/
│       └── controllers/
│       └── pages/
│       └── repositories/
│       └── services/
│       └── tests/
│       └── validations/
│       └── user.routes.ts
├── start/
├── .env
├── cmd.ts
├── package.json
```

---

## Commands and Scaffold

The Harpia Framework provides a set of commands to streamline development. These commands are defined in the `package.json` file:

| Command   | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `start`   | Starts the application.                                                     |
| `dev`     | Starts the application in development mode with hot-reloading.              |
| `tests`   | Runs tests for a specific module or directory (e.g., `user/store`).         |
| `g`       | Generates modules, files, and other scaffolding components.                 |
| `studio`  | Starts Prisma Studio for database management.                               |
| `seed`    | Runs database seed scripts.                                                 |
| `migrate` | Generates prisma client types and applies all pending database migrations.  |

---

## Env

The `.env` file contains environment-specific configurations. Below is an example of the required environment variables:

```env
# Application
APP_ID=
MONITOR_SECRET=
ENV=development
PORT=3000
MODE=fullstack

# Database
# DB_PROVIDER=<YOUR_DB_USER>
# DB_USER=<YOUR_DB_USER>
# DB_PASS=<YOUR_DB_PASS>
# DB_PORT=<YOUR_DB_PORT>
# DB_NAME=<YOUR_DB_NAME>
# DB_HOST=<YOUR_DB_HOST>
# DB_URL=${DB_PROVIDER}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Database SQLite
DB_URL="file:./dev.db"

# Redis
REDIS_HOST=localhost
REDIS_USER=
REDIS_PASS=
REDIS_PORT=6379

# Mailer
SMTP_HOST=<YOUR_SMTP_HOST>
SMTP_PORT=<YOUR_SMTP_PORT>
SMTP_USER=<YOUR_SMTP_USER>
SMTP_PASSWORD=<YOUR_SMTP_PASSWORD>
SMTP_SECURE=<IF_SHOULD_USE_SSL>

# Amazon S3
S3_KEY=<YOUR_S3_KEY>
S3_SECRET=<YOUR_S3_SECRET>
S3_BUCKET=<YOUR_S3_BUCKET>
S3_REGION=<YOUR_S3_REGION>
S3_ENDPOINT=https://s3.${S3_REGION}.amazonaws.com
S3_BUCKET_PATH=https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/
```

---

## App

The `app` directory is the core of the application. It contains:

- **Commands**: Custom CLI commands.
- **Config**: Configuration files for the application.
- **Database**: Database-related files, including migrations and models.
- **Helpers**: Utility functions and helpers.
- **Middlewares**: Custom middleware for request processing.
- **Services**: Business logic and external service integrations.
- **Tasks**: Background tasks and cron jobs.
- **Utils**: General utilities and reusable code.

---

## Modules

The application is divided into modules, each encapsulating a specific feature or functionality. Each module typically includes:

- **Controllers**: Handles incoming requests and returns responses.
- **Services**: Contains business logic.
- **Repositories**: Manages database interactions.
- **Tests**: Unit and integration tests for the module.
- **Validations**: Request validation logic.
- **Routes**: Defines the API endpoints for the module.

Example module structure:

```md
modules/
├── system/
│   ├── controllers/
│   ├── services/
│   ├── tests/
│   └── system.routes.ts
├── user/
│   ├── controllers/
│   ├── pages/
│   ├── repositories/
│   ├── services/
│   ├── tests/
│   ├── validations/
│   └── user.routes.ts
```

---

## Mailer

The `Mailer` class, located in `app/services/mailer/index.ts`, is used to send emails. It leverages the `Nodemailer` library and is configured via `app/config/mailer.ts`.

---

## Tasks and Jobs

Background tasks and cron jobs are managed in the `app/tasks` directory. Use the `bun g` command to generate a new task. Tasks use the `cron` library for scheduling. To enable task execution, uncomment the task runner in `start/server.ts`.

---

## Observers

Model observers are defined in the `app/observers` directory. They allow you to listen to Prisma operations (like create, update, delete) and execute custom logic. Use the `bun g` command to generate a new observer. Observers are automatically loaded on startup.

You can listen to any of the following Prisma operations:

```typescript
"findUnique" | "findUniqueOrThrow" | "findFirst" | "findFirstOrThrow"
"findMany" | "create" | "createMany" | "createManyAndReturn"
"delete" | "update" | "deleteMany" | "updateMany"
"updateManyAndReturn" | "upsert" | "aggregate" | "groupBy" | "count"
```

Observers are useful for logging, triggering side effects, or integrating with external services when database operations occur.
---

## S3

The `S3Service` class, located in `app/services/s3/index.ts`, provides functionality to interact with Amazon S3. It uses Bun's native S3 module for file uploads, downloads, and management.

### Configuration

The `S3Service` requires an `S3Options` object for initialization:

```typescript
const s3Service = new S3Service({
  accessKeyId: "your-access-key",
  secretAccessKey: "your-secret-key",
  bucket: "my-bucket",
  region: "us-east-1",
});
```

### Usage

- **Uploading a File**:
  ```typescript
  await s3Service.send("example.txt", "Hello, S3!", { type: "text/plain" });
  ```

- **Reading a File as Text**:
  ```typescript
  const content = await s3Service.readAsText("example.txt");
  ```

- **Deleting a File**:
  ```typescript
  await s3Service.delete("example.txt");
  ```

- **Uploading Large Files**:
  ```typescript
  await s3Service.sendLargeFile("large-file.bin", largeFileBuffer, { partSize: 5 * 1024 * 1024 });
  ```

- **Generating a Presigned URL**:
  ```typescript
  const presignedUrl = s3Service.generatePresignedUrl("example.txt", { expiresIn: 3600 });
  ```

For more details, refer to the [S3 Service Documentation](#s3).

---

## Utilities

Harpia includes a set of built-in utility classes to simplify common operations with arrays, objects, strings, and dates. These utilities follow the singleton pattern and can be accessed globally through the `Utils` object.

## Available Utilities

- `Utils.array` – Array manipulation (sort, filter, difference, etc.)
- `Utils.object` – Object manipulation (merge, pick, omit, etc.)
- `Utils.string` – String manipulation (casing, slug, formatting, etc.)
- `Utils.date` – Date parsing, formatting, and calculations
- `paginate()` – Simple pagination metadata helper
- `colorize()` – Terminal color formatter for logs

---

### `Utils.array`

Provides convenient methods to work with arrays using Lodash under the hood.

```ts
Utils.array.sortBy(users, "name");
Utils.array.filter(items, (i) => i.active);
Utils.array.compact([1, null, undefined, 0]); // → [1]
Utils.array.uniq(["a", "a", "b"]); // → ["a", "b"]
Utils.array.difference([1, 2], [2, 3]); // → [1]
```

---

### `Utils.object`

Helper for manipulating objects.

```ts
Utils.object.merge({ a: 1 }, { b: 2 });
Utils.object.pick(user, ["id", "name"]);
Utils.object.omit(user, ["password"]);
Utils.object.omitFromList(users, ["email"]);
Utils.object.isEmpty({}); // → true
```

---

### `Utils.string`

Includes helpers for transforming and analyzing strings.

```ts
Utils.string.pluralize("post"); // → "posts"
Utils.string.camelCase("user name"); // → "userName"
Utils.string.pascalCase("user name"); // → "UserName"
Utils.string.toSlug("Harpia Framework!"); // → "harpia-framework"
Utils.string.truncate("This is a long text", 10); // → "This is a..."
Utils.string.stripTags("<h1>Hello</h1>"); // → "Hello"
```

---

### `Utils.date`

A full-featured date utility class with parsing, formatting, localization, math, and comparison support.

```ts
const date = new DateUtility("2024-12-25");

date.getDayName(); // → "Wednesday"
date.format("YYYY-MM-DD HH:mm"); // → "2024-12-25 00:00"
date.add(1, "day").format("YYYY-MM-DD"); // → "2024-12-26"
date.isBefore(new DateUtility("2025-01-01")); // → true
```

It supports Moment.js-like tokens and localization (e.g., `"en"`, `"pt-BR"`). You can also chain methods like `.startOf("day")`, `.endOf("hour")`, `.difference(other, "days")`, and more.

---

### `paginate({ data, page, perPage, totalData })`

Returns a consistent pagination response with `meta` info.

```ts
paginate({
  data: users,
  page: 2,
  perPage: 10,
  totalData: 35,
});

/*
{
  data: [...],
  meta: {
    currentPage: 2,
    lastPage: 4,
    perPage: 10,
    totalPages: 4,
    totalItems: 35,
  }
}
*/
```

---

### `colorize(color: string, text: string)`

Terminal formatter using Bun's color support.

```ts
colorize("blue", "Hello world");
```

Returns the formatted string with ANSI color codes for terminal output.

---

## Accessing Utilities

All utilities are automatically available through:

```ts
import { Utils } from "app/utils";

Utils.string.camelCase("hello world");
Utils.array.uniq(["a", "b", "a"]);
```

You can also import them individually if needed:

```ts
import { StringUtility } from "app/utils/string";
import { DateUtility } from "app/utils/date";
```

---

> 💡 Tip: These utilities are lightweight and ready to use in any context — including controllers, jobs, templates, or services.


## Authors

- [@lucasnjsilva](https://www.github.com/lucasnjsilva)
- [Harpia Core GitHub repository](https://github.com/harpiats/core).

---

This documentation provides a comprehensive guide to using the Harpia Framework. For advanced use cases, refer to the official [Harpia Core Documentation](https://github.com/harpiats/core).

> For a complete documentation about the Harpia Framework, access the [Harpia Documentation](http://harpia.github.io)