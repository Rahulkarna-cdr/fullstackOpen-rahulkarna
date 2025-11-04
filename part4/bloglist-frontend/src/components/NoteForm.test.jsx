import { render, screen } from "@testing-library/react";
import NewBlog from "./NoteForm";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

test("form calls event handler with right details when a new blog is created", async () => {
  const mockHandleCreate = vi.fn();
  const mockSetToggle = vi.fn();

  // Create a wrapper component to manage state
  const TestWrapper = () => {
    const [formData, setFormData] = useState({
      title: "",
      author: "",
      url: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      mockHandleCreate(formData);
    };

    return (
      <NewBlog
        title={formData.title}
        author={formData.author}
        url={formData.url}
        handleCreate={handleSubmit}
        handleChange={handleChange}
        setToggle={mockSetToggle}
      />
    );
  };

  render(<TestWrapper />);

  const user = userEvent.setup();

  // Get the input fields
  const titleInput = screen.getByLabelText(/title:/i);
  const authorInput = screen.getByLabelText(/author:/i);
  const urlInput = screen.getByLabelText(/url:/i);

  // Type into the inputs
  await user.type(titleInput, "Testing React Applications");
  await user.type(authorInput, "Kent C. Dodds");
  await user.type(urlInput, "https://testing-library.com");

  // Get the submit button and click it
  const submitButton = screen.getByText("Create");
  await user.click(submitButton);

  // Verify that handleCreate was called once with the correct data
  expect(mockHandleCreate).toHaveBeenCalledTimes(1);
  expect(mockHandleCreate).toHaveBeenCalledWith({
    title: "Testing React Applications",
    author: "Kent C. Dodds",
    url: "https://testing-library.com",
  });
});
