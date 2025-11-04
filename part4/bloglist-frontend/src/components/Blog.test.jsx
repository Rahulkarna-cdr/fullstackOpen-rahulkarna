import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders title but not details by default", () => {
  const blog = {
    title: "testing content",
    author: "Test",
    url: "https://example.com/guide-to-mongodb",
    likes: 6,
  };
  render(<Blog blog={blog} />);

  // Title should be visible
  const titleElement = screen.getByText("testing content");
  expect(titleElement).toBeDefined();

  // Author should NOT be visible initially
  const authorElement = screen.queryByText("Test");
  expect(authorElement).toBeNull();

  // URL should NOT be visible initially
  const urlElement = screen.queryByText("https://example.com/guide-to-mongodb");
  expect(urlElement).toBeNull();
});
