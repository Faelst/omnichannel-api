import { adaptRoute } from ".";

const makeController = () => {
  class ControllerStub {
    statusCode = 200;

    handle() {
      return {
        statusCode: this.statusCode,
        body: {
          name: "any_name",
        },
      };
    }
  }

  const controllerStub = new ControllerStub();

  return controllerStub;
};

describe("Express Route Adapter", () => {
  it("should be able to return 200", async () => {
    const sut = adaptRoute(makeController() as any);

    const req = {
      body: {
        name: "any_name",
      },
      params: {
        id: "any_id",
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    await sut(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      name: "any_name",
    });
  });

  it("should be able to return 200", async () => {
    const sut = adaptRoute(makeController() as any);

    const req = {
      body: {},
      params: {},
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    await sut(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      name: "any_name",
    });
  });

  it("should be able to return 500", async () => {
    const controllerStub = makeController();
    const sut = adaptRoute(controllerStub as any);

    const req = {
      body: {
        name: "any_name",
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    controllerStub.statusCode = 500;

    await sut(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
