import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

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

describe("blogs URL and number of likes are shown when the button controlling the shown details has been clicked.", () => {
  const blog = {
    title: "testing content",
    author: "Test",
    url: "https://example.com/guide-to-mongodb",
    likes: 6,
    user: {
      username: "test_User",
      name: "test",
      blogs: [],
    },
  };

  beforeEach(() => {
    render(<Blog blog={blog} setBlogs={() => {}} />);
  });

  test("at start blogs URL and number of likes are not displayed", () => {
    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(/Likes:/)).toBeNull();
  });

  test('after clicking, blogs URL and number of likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(screen.getByText(blog.url, { exact: false })).toBeVisible()
    expect(screen.getByText(/Likes: 6/)).toBeVisible()
  });
});

