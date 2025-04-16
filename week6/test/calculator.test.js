const expect = require("chai").expect;
const request = require("request");

describe("Calculator API", function () {
    const baseUrl = "http://localhost:3004";

    it("should return status 200 on root route", function (done) {
        request(baseUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    describe("Addition", () => {
        it("should return correct sum for valid numbers", function (done) {
            request.get(`${baseUrl}/add?a=10&b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("15");
                done();
            });
        });

        it("should return correct sum for decimals", function (done) {
            request.get(`${baseUrl}/add?a=2.3&b=3.7`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("6");
                done();
            });
        });
    });

    describe("Subtraction", () => {
        it("should return correct result for valid numbers", function (done) {
            request.get(`${baseUrl}/subtract?a=10&b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("5");
                done();
            });
        });

        it("should return correct result for negative result", function (done) {
            request.get(`${baseUrl}/subtract?a=5&b=10`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("-5");
                done();
            });
        });
    });

    describe("Multiplication", () => {
        it("should return correct product for valid numbers", function (done) {
            request.get(`${baseUrl}/multiply?a=4&b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("20");
                done();
            });
        });
        it("should return correct product when one number is negative", function (done) {
            request.get(`${baseUrl}/multiply?a=-4&b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("-20");
                done();
            });
        });
        it("should return correct product when both numbers are negative", function (done) {
            request.get(`${baseUrl}/multiply?a=-4&b=-5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("20");
                done();
            });
        });
        it("should return 0 when one value is 0", function (done) {
            request.get(`${baseUrl}/multiply?a=0&b=99`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("0");
                done();
            });
        });
    });


    describe("Division", () => {
        it("should return correct quotient for valid numbers", function (done) {
            request.get(`${baseUrl}/divide?a=10&b=2`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("5.00");
                done();
            });
        });
        it("should return correct quotient when divisor is negative", function (done) {
            request.get(`${baseUrl}/divide?a=10&b=-2`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("-5");
                done();
            });
        });
        it("should return correct quotient when both numbers are negative", function (done) {
            request.get(`${baseUrl}/divide?a=-10&b=-2`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("5.00");
                done();
            });
        });
        it("should return error when dividing by 0", function (done) {
            request.get(`${baseUrl}/divide?a=10&b=0`, function (error, response, body) {
                expect(response.statusCode).to.not.equal(200);
                done();
            });
        });
    });


    describe("Error Cases", () => {
        it("should return error for non-numeric input", function (done) {
            request.get(`${baseUrl}/add?a=abc&b=5`, function (error, response, body) {
                expect(response.statusCode).to.not.equal(200);
                done();
            });
        });

        it("should return error for missing parameters", function (done) {
            request.get(`${baseUrl}/subtract?a=10`, function (error, response, body) {
                expect(response.statusCode).to.not.equal(200);
                done();
            });
        });

        it("should return error when both parameters are missing", function (done) {
            request.get(`${baseUrl}/multiply`, function (error, response, body) {
                expect(response.statusCode).to.not.equal(200);
                done();
            });
        });
    });
});
