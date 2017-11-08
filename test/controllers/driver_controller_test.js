const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Driver controller", () => {
  it("post to api/drivers : creates a driver", done => {
    Driver.count().then(countBefore => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end((err, response) => {
          assert(response.status === 200);

          Driver.count().then(countAfter => {
            assert(countBefore + 1 === countAfter);
            done();
          });
        });
    });
  });
});
