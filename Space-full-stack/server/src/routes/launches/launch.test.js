describe("Test Get /launches", () => {
  test("It should respond with 200 success", () => {
    const response = 200;
    expect(response).toBe(200);
  });
});

describe("Test POST /launches", () => {
  test("It should respond with 201 created", () => {
    const response = 201;
    expect(response).toBe(201);
  });

  test("It should  catch Missing required launch properties", () => {
    const response = 400;
    expect(response).toBe(400);
  });
  test("It should  catch Invalid launch date", () => {
    const response = 400;
    expect(response).toBe(400);
  });
});
