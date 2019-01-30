const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");

describe("Testing", () => {
    it("should appear", (done) => {

        request(app)
            .get("/api/index")
            .expect(200)
            .expect(res => expect(res.body.message).toBe("Hello 🌎 from the server! 😸"))
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            })
    })
});