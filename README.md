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
- [Factory](#factory)
- [TestCleaner](#)
- [Mailer](#mailer)
- [Tasks and Jobs](#tasks-and-jobs)
- [S3](#s3)
- [Utilities](#utilities)
- [Authors](#authors)
- [License](#license)

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
| `lint`    | Runs lint for a specific module or file (e.g., `user/controller/store`).    |
| `g`       | Generates modules, files, and other scaffolding components.                 |
| `studio`  | Starts Prisma Studio for database management.                               |
| `seed`    | Runs database seed scripts.                                                 |
| `migrate` | Generates prisma client types and applies all pending database migrations.  |
| `deploy`  | Generates prisma client types and applies all pending database migrations.  |

> You can run the `tests` command like `bun tests user` to execute all tests within the `user` module.
> To run tests sequentially, add the `--runInBand` flag, for example: `bun tests user --runInBand`.
>
> The `lint` command can be used on a specific module, directory, or file. For example:
>
> * `bun lint user` lints the entire `user` module.
> * `bun lint user/controller` lints the `controller` directory within the `user` module.
> * `bun lint user/controller/store` lints a specific file.

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

## Factory
The `Factory` helps you generate fake data and seed your database for testing or development purposes. It uses [`@faker-js/faker`](https://github.com/faker-js/faker) and provides a fluent API for creating real or stubbed model data.


### Generating a Factory
You can quickly generate a factory for any model using the generator:

```bash
bun g
```

Then select the `Factory` option and provide the model name when prompted:

```bash
? What do you want to forge? (Use arrow keys)
  Module
  Controller
  Test
❯ Factory
  Seed
  Task
  Validation
  Observer

✔ What do you want to forge? Factory
✔ Factory name (Use a model name): user
```

This will create a pre-configured seed file at `app/database/factories/user.factory.ts`.

### Defining a Factory

You define a factory by passing a model and a function that returns fake attributes.

```ts
// app/database/factories/user.factory.ts
import { Factory } from "app/helpers/Factory";
import { User } from "..";

const UserFactory = new Factory().define(User, (faker) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "USER",
  }
});

export { UserFactory };
```

---

### Using a Factory

You can merge static or dynamic attributes, create single or multiple records, or return stubbed data without saving to the database.

```ts
import { UserFactory } from "app/database/factories/user.factory";

const user = await UserFactory
  .merge({ role: "ADMIN" })
  .create();
```

---

### Creating Multiple Records

```ts
await UserFactory.createMany(10);
```

---

### Returning Stubbed Data (no DB interaction)

```ts
const fakeUser = await UserFactory.makeStubbed();
const fakeUsers = await UserFactory.makeStubbedMany(5);
```

---

### Example with Relationships

```ts
import { PostFactory } from "app/database/factories/post.factory";
import { UserFactory } from "app/database/factories/user;factory";

export async function run() {
  const author = await UserFactory.merge({ role: "AUTHOR" }).create();

  await PostFactory.merge({ authorId: author.id }).createMany(3);
}
```

---

### Attribute Selection (`pick` and `get`)

The Factory provides `pick` and `get` methods to select specific attributes from objects or arrays, either from created records or stubbed data.

```ts
// Select single or multiple attributes from a created record
const userName = await user.pick("name");
const userInfo = await user.pick(["name", "email"]);

// Get attribute values directly
const emails = await user.get("email");
const values = await user.get(["name", "role"]);

// Works on multiple records
const users = await UserFactory.createMany(5);
const names = await users.pick("name");       // Array of objects with only the name
const emailValues = await users.get("email"); // Array of emails
```

* `pick(keys)` returns **an object or array of objects** containing only the selected keys.
* `get(keys)` returns **the values** of the selected keys directly.

---

### API

| Method              | Description |
|---------------------|-------------|
| `.define(model, fakerFn)`     | Define a factory for a model. |
| `.merge(attributes)`          | Merge static values into the generated data. |
| `.create()`                  | Create and return one record. |
| `.createMany(count)`         | Create and return multiple records. |
| `.makeStubbed()`             | Return one fake object (not persisted). |
| `.makeStubbedMany(count)`    | Return multiple fake objects. |
| `.pick(keys)` | Select specific attributes from a record or array of records. |
| `.get(keys)` | Get the values of specific attributes from a record or array of records. |
	

> Each call to `create()` or `makeStubbed()` resets the merge state, ensuring isolation between uses.


## Test Cleaner

The `TestCleaner` is a utility class designed to help manage and clean up database records created during tests. It ensures that records registered during test execution are deleted after each test, keeping the database in a clean state.

---

#### Initialization

You initialize `TestCleaner` by providing a mapping of your models:

```ts
import { TestCleaner } from "app/helpers/TestCleaner";
import { User, Role } from "app/models";

const cleaner = new TestCleaner({
  User,
  Role,
});
```

* **Constructor argument:** an object mapping model names to Prisma model instances.
* Automatically tracks records to delete for each model.

---

#### Registering Records

You can register single or multiple records for deletion:

```ts
// Register a single record
cleaner.register("User", 1);

// Register multiple records
cleaner.registerMany("Role", [10, 12, 15]);
```

* `register(modelName, id)` – registers a single record ID.
* `registerMany(modelName, ids)` – registers multiple record IDs.

---

#### Cleaning Records

After tests, you can clean all registered records:

```ts
await cleaner.clean();
```

* Deletes all registered records for all models.
* Resets the internal list of records after deletion.
* If deletion fails for a record, a warning is logged but the cleanup continues.

You can also manually reset the list without deleting:

```ts
cleaner.reset();
```

---

#### Accessing Registered Data

You can inspect pending deletions:

```ts
const models = cleaner.getModels(); 
// → ["User", "Role"]

const pending = cleaner.getPendingRecords();
/* 
{
  User: [1],
  Role: [10, 12, 15]
}
*/
```

---

#### Example Test Usage

```ts
import { TestClient } from "app/test/TestClient";
import { TestCleaner } from "app/helpers/TestCleaner";
import { UserFactory, RoleFactory } from "app/database/factories";
import { User, Role } from "app/models";

const client = new TestClient(app);
const cleaner = new TestCleaner({ User, Role });

describe("[POST] /users - User endpoint", () => {
  test("successfully create a user", async () => {
    const data = await UserFactory.makeStubbed();
    const request = await client.post("/users").json(data).execute();
    const response = await request.json();

    cleaner.register("User", response.result.id);

    expect(request.status).toBe(201);
    expect(response.result).toMatchObject({
      id: expect.any(Number),
      name: data.name,
      email: data.email,
    });
  });

  test("creating a user with an existing email fails", async () => {
    const existing = await UserFactory.create();
    const data = await UserFactory.makeStubbed({ email: existing.email });

    const request = await client.post("/users").json(data).execute();
    const response = await request.json();

    cleaner.register("User", existing.id);

    expect(request.status).toBe(400);
    expect(response.error.message).toBe("Email already exists.");
  });
});

describe("[POST] /roles - Role endpoint", () => {
  test("successfully create a role", async () => {
    const data = await RoleFactory.makeStubbed();
    const request = await client.post("/roles").json(data).execute();
    const response = await request.json();

    cleaner.register("Role", response.result.id);

    expect(request.status).toBe(201);
    expect(response.result).toMatchObject({
      id: expect.any(Number),
      name: data.name,
    });
  });
});

afterEach(async () => {
  await cleaner.clean();
});
```

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

> For a complete documentation about the Harpia Framework, access the [Harpia Documentation](http://harpiats.github.io)

## License

Harpia Framework is an open-source software licensed under the [Apache License 2.0](./LICENSE).

This project also uses third-party libraries, each under their own license.
See the [NOTICE](./NOTICE) file for details on major dependencies such as
Prisma, Zod, Nodemailer, ioredis, and Lodash.
