const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // Empty the database
    await request.post("http://localhost:3001/api/testing/reset");

    // Create a user for the backend
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
      // Fill in the login form with correct credentials
      await page.getByLabel("username").fill("alison");
      await page.getByLabel("password").fill("password");

      // Click login button
      await page.getByRole("button", { name: "login" }).click();

      // Check that we're logged in - should see the username
      await expect(page.getByText("alison logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      // Fill in the login form with wrong password
      await page.getByLabel("username").fill("alison");
      await page.getByLabel("password").fill("wrongpassword");

      // Click login button
      await page.getByRole("button", { name: "login" }).click();

      // Should show an error message
      await expect(page.getByText("wrong username or password")).toBeVisible();

      // Should still be on login page (not logged in)
      await expect(page.getByText("log in to application")).toBeVisible();

      // Should NOT see logged in message
      await expect(page.getByText("alison logged in")).not.toBeVisible();
    });
  });
});
