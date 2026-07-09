const { describe, test } = require("node:test");
const { deepStrictEqual } = require("node:assert");
const request = require("supertest");
const app = require("../../app");

describe("Test Get /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);

    // expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Test Mission",
    rocket: "Test Rocket",
    target: "Test Target",
    launchDate: "January 1, 2023",
  };

  const launchDataWithoutDate = {
    mission: "Test Mission",
    rocket: "Test Rocket",
    target: "Test Target",
  };
  const launchDataWithInvalidDate = {
    mission: "Test Mission",
    rocket: "Test Rocket",
    target: "Test Target",
    launchDate: "not a date",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    //   this build by node.js self
    deepStrictEqual(requestDate, responseDate);

    const { mission, rocket, target } = response.body;
    deepStrictEqual({ mission, rocket, target }, launchDataWithoutDate);

    //   this test by jest
    // expect(responseDate).toBe(requestDate);
    // expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should  catch Missing required launch properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    deepStrictEqual(response.body, {
      error: "Missing required launch property",
    });
    // expect(response.body).toStrictEqual({
    //   error: "Missing required launch property",
    // });
  });

  test("It should  catch Invalid launch date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    deepStrictEqual(response.body, {
      error: "Invalid launch date",
    });
    // expect(response.body).toStrictEqual({
    //   error: "Invalid launch date",
    // });
  });
});
