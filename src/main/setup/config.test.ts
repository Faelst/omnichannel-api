import request from "supertest";
import app from "../config/app";

describe("API SETUP", () => {
  test("Should disabled x-powered-by header", () => {
    app.get("/test_x_powered_by", (req, res) => {
      res.send("test_x_powered_by");
    });

    expect(app.get("x-powered-by")).toBe(false);
  });

  test("Should parser Body as JSON", async () => {
    app.post("/test_json_parser", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post("/test_json_parser")
      .send({ name: "any_name" })
      .expect({ name: "any_name" });
  });

  test("Should return JSON content type as default", async () => {
    app.get("/test_content_type", (_, res) => {
      res.json({ name: "any_name" });
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });

  test("Should return XML content type is defined", async () => {
    app.get("/test_content_type_xml", (_, res) => {
      res.type("xml");
      res.send("");
    });

    await request(app)
      .get("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
