/* eslint-disable no-undef */
const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST, PORT } = process.env;

describe("test auth login route", () => {
	let server;
	beforeAll(() => {
		server = app.listen(PORT);
		mongoose.connect(DB_HOST);
	});

	afterAll(async () => {
		server.close();
		await mongoose.connection.close();
	});

	test("login function returns correct data", async () => {
		const loginData = {
			email: "anna.bazdyreva@gmail.com",
			password: "ABC123",
		};
		const response = await request(app)
    .post("/users/login")
    .send(loginData);
		expect(response.statusCode).toBe(200);
		expect(response.body.token).toEqual(expect.any(String))
		expect(response.body).toHaveProperty('user')
		expect(response.body.user).toStrictEqual({
		    email: expect.any(String),
		    subscription: expect.any(String),
		  })
	});
});
