import { describe, expect, it } from "bun:test";
import { TestClient } from "@harpia/core";
import { app } from "start/server";

const client = new TestClient(app);
const API_KEY = process.env.TELEMETRY_API_KEY || "harpia-telemetry-dev-key";

function withAuth(req: TestClient): TestClient {
  return req.set("Authorization", `Bearer ${API_KEY}`);
}

describe("[Telemetry Module] Authentication", () => {
  it("should reject requests without authorization header", async () => {
    const request = await client.get("/telemetry").execute();

    expect(request.status).toBe(401);

    const body = await request.json();
    expect(body.message).toBe("Missing or invalid authorization header.");
  });

  it("should reject requests with invalid API key", async () => {
    const request = await client
      .get("/telemetry")
      .set("Authorization", "Bearer invalid-key")
      .execute();

    expect(request.status).toBe(403);

    const body = await request.json();
    expect(body.message).toBe("Invalid API key.");
  });

  it("should accept requests with valid API key", async () => {
    const request = await withAuth(client.get("/telemetry")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.status).toBe("OK");
  });
});

describe("[Telemetry Module] GET /telemetry (summary)", () => {
  it("should return a summary for today", async () => {
    const request = await withAuth(client.get("/telemetry")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.result).toHaveProperty("date");
    expect(body.result).toHaveProperty("totalRequests");
    expect(body.result).toHaveProperty("uniqueVisitors");
    expect(body.result).toHaveProperty("topPages");
    expect(body.result).toHaveProperty("avgResponseTime");
    expect(body.result).toHaveProperty("totalErrors");
  });

  it("should accept a date query param", async () => {
    const request = await withAuth(client.get("/telemetry?date=2025-01-01")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.result.date).toBe("2025-01-01");
  });
});

describe("[Telemetry Module] GET /telemetry/all", () => {
  it("should return all telemetry data", async () => {
    const request = await withAuth(client.get("/telemetry/all")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.result).toHaveProperty("access");
    expect(body.result).toHaveProperty("behavior");
  });
});

describe("[Telemetry Module] GET /telemetry/daily-stats", () => {
  it("should return daily stats as an array", async () => {
    const request = await withAuth(client.get("/telemetry/daily-stats")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(Array.isArray(body.result)).toBe(true);
  });
});

describe("[Telemetry Module] GET /telemetry/visitors", () => {
  it("should return visitors data", async () => {
    const request = await withAuth(client.get("/telemetry/visitors")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.status).toBe("OK");
  });
});

describe("[Telemetry Module] GET /telemetry/visitors/count", () => {
  it("should return unique visitor count", async () => {
    const request = await withAuth(client.get("/telemetry/visitors/count")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.result).toHaveProperty("count");
    expect(typeof body.result.count).toBe("number");
  });
});

describe("[Telemetry Module] GET /telemetry/pages/views", () => {
  it("should return page views data", async () => {
    const request = await withAuth(client.get("/telemetry/pages/views")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.status).toBe("OK");
  });
});

describe("[Telemetry Module] GET /telemetry/pages/top", () => {
  it("should return top pages with default limit", async () => {
    const request = await withAuth(client.get("/telemetry/pages/top")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(Array.isArray(body.result)).toBe(true);
  });
});

describe("[Telemetry Module] GET /telemetry/performance/avg-response-time", () => {
  it("should return average response time", async () => {
    const request = await withAuth(client.get("/telemetry/performance/avg-response-time")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.result).toHaveProperty("avgResponseTime");
    expect(typeof body.result.avgResponseTime).toBe("number");
  });
});

describe("[Telemetry Module] GET /telemetry/performance/slow-requests", () => {
  it("should return slow requests", async () => {
    const request = await withAuth(client.get("/telemetry/performance/slow-requests?threshold=500")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(Array.isArray(body.result)).toBe(true);
  });
});

describe("[Telemetry Module] GET /telemetry/errors", () => {
  it("should return errors data", async () => {
    const request = await withAuth(client.get("/telemetry/errors")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(Array.isArray(body.result)).toBe(true);
  });
});

describe("[Telemetry Module] GET /telemetry/errors/count", () => {
  it("should return error count", async () => {
    const request = await withAuth(client.get("/telemetry/errors/count")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.result).toHaveProperty("count");
    expect(typeof body.result.count).toBe("number");
  });
});

describe("[Telemetry Module] GET /telemetry/traffic-sources", () => {
  it("should return traffic sources", async () => {
    const request = await withAuth(client.get("/telemetry/traffic-sources")).execute();

    expect(request.status).toBe(200);

    const body = await request.json();
    expect(body.status).toBe("OK");
  });
});

describe("[Telemetry Module] DELETE /telemetry/data", () => {
  it("should reject delete without filters", async () => {
    const request = await withAuth(client.delete("/telemetry/data")).execute();

    expect(request.status).toBe(400);

    const body = await request.json();
    expect(body.error.code).toBe("BAD_REQUEST");
  });
});
