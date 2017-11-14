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

  it("PUT to to api/drivers : edit a driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end((err, response) => {
          assert(response.status === 200);
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers : delete a driver", done => {
    const driver = new Driver({ email: "t@t.com" });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end((err, response) => {
          assert(response.status === 204);
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it("GET to /api/drivers : get a list of driver by position", done => {
    const seattleDriver = new Driver({
      email: "seattle@t.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.62147628] }
    });
    const miamiDriver = new Driver({
      email: "miami@t.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, response) => {
          assert(response.status === 200);
          assert(response.body.length === 1);
          assert(response.body[0].obj.email === miamiDriver.email);
          done();
        });
    });
  });
});
