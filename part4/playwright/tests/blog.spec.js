const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Alison",
        username: "alison",
        password: "password",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("alison");
      await page.getByLabel("password").fill("password");

      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("alison logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("alison");
      await page.getByLabel("password").fill("wrongpassword");

      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();

      await expect(page.getByText("log in to application")).toBeVisible();

      await expect(page.getByText("alison logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("alison");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("alison logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new Blog" }).click();

      await page.getByLabel("title").fill("Test Blog Title");
      await page.getByLabel("author").fill("Test Author");
      await page.getByLabel("url").fill("https://test.com");

      await page.getByRole("button", { name: "Create" }).click();

      await expect(page.getByText("Test Blog Title")).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "Create new Blog" }).click();

      await page.getByLabel("title").fill("Blog to Like");
      await page.getByLabel("author").fill("Test Author");
      await page.getByLabel("url").fill("https://test.com");

      await page.getByRole("button", { name: "Create" }).click();

      await expect(page.getByText("Blog to Like")).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("Likes: 0")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("Likes: 1")).toBeVisible();
    });
  });
});
