const assert = require("assert");
const request = require("supertest");

const app = require("../app");

describe("Check routes are working", () => {
  it("Get on /api", done => {
    request(app)
      .get("/api")
      .end((err, response) => {
        assert(response.status === 200);
        assert(response.body.hi === "there");
        done();
      });
  });
});
