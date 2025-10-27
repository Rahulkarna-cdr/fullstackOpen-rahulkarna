const User = require("../models/users");
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_Helper");
const api = supertest(app);
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;

beforeEach(async () => {
  await User.deleteMany({});
  let userObj = { ...helper.initialUsers[0] };
  let passwordHash = await bcrypt.hash(userObj.password, saltRounds);
  userObj.passwordHash = passwordHash;
  delete userObj.password;
  userObj = new User(userObj);

  await userObj.save();

  userObj = { ...helper.initialUsers[1] };
  passwordHash = await bcrypt.hash(userObj.password, saltRounds);
  userObj.passwordHash = passwordHash;
  delete userObj.password;
  userObj = new User(userObj);

  await userObj.save();
});

after(async () => {
  await mongoose.connection.close();
});

test("users are returned as JSON", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.length, helper.initialUsers.length);
});

test("username field is empty", async () => {
  const newUser = {
    name: "Max Payne",
    password: "LegendaryGame@123",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(response.body.error.includes("username is required"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});

test("password field is empty", async () => {
  const newUser = {
    username: "maxpayne23",
    name: "Max Payne",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(response.body.error.includes("password is required"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});

test("username field's length is less than 3 ", async () => {
  const newUser = {
    name: "Alice Johnson",
    username: "Al",
    password: "Hello",
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(response.body.error.includes("username is too short"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});

test("password field's length is less than 3 ", async () => {
  const newUser = {
    name: "Alice Johnson",
    username: "Aliceee",
    password: "He",
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(
    response.body.error.includes("Password must be at least 3 characters long")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});

test("username is not unique", async () => {
  const newUser = {
    name: "Kevin Paine",
    username: "spacemonkey",
    password: "kevinEleven@783",
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(response.body.error.includes("user already exists"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});
