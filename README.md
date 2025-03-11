# Application

The Harpia Framework is built on top of the **Harpia Core**, which provides the foundational structure and utilities for the framework. For more details on the core functionalities, refer to the [Harpia Core Documentation](https://github.com/harpia-framework/core).

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
DB_PROVIDER=<YOUR_DB_USER>
DB_USER=<YOUR_DB_USER>
DB_PASS=<YOUR_DB_PASS>
DB_PORT=<YOUR_DB_PORT>
DB_NAME=<YOUR_DB_NAME>
DB_HOST=<YOUR_DB_HOST>
DB_URL=${DB_PROVIDER}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}

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
S3_BUCKET_PATH=https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/projects
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

## Authors

- [@lucasnjsilva](https://www.github.com/lucasnjsilva)
- [Harpia Core GitHub repository](https://github.com/harpia-framework/core).

---

This documentation provides a comprehensive guide to using the Harpia Framework. For advanced use cases, refer to the official [Harpia Core Documentation](https://github.com/harpia-framework/core).