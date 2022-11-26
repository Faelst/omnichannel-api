export class ServerError extends Error {
  constructor(paramName: string) {
    super(`ServerError: ${paramName}`);
    this.name = "ServerError";
  }
}
