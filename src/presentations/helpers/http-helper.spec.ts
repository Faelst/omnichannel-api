import { ServerError, UnauthorizedError } from "@presentations/errors";
import {
  badRequest,
  forbidden,
  noContent,
  ok,
  serverError,
  unauthorized,
} from "./http-helper";

describe("Http Helper", () => {
  it("should be able to return 200", () => {
    const response = ok("any_data");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("any_data");
  });

  it("should be able to return 204", () => {
    const response = noContent();
    expect(response.statusCode).toBe(204);
    expect(response.body).toBe(null);
  });

  it("should be able to return 500", () => {
    const response = serverError(new Error());
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  it("should be able to return 500 with stack", () => {
    const response = serverError(new Error("any_stack"));
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("any_stack"));
  });

  it("should be able to return 401 when unauthorized", () => {
    const response = unauthorized();
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(new UnauthorizedError());
  });

  it("should be able to return 403 when forbidden", () => {
    const response = forbidden(new Error());
    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual(new Error());
  });

  it("should be able to return 400 when bad request", () => {
    const response = badRequest(new Error());
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error());
  });
});
