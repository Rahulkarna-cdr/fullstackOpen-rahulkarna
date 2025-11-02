const baseUrl = "/api/blogs";

//extracting token to authenticate user
const getToken = () => {
  const loggedUserJSON = localStorage.getItem("loggedUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return null;
};

const getAll = async () => {
  try {
    const token = getToken();
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("server returned some errors", response.status);
      return [];
    }
  } catch (error) {
    console.error("error fetching data", error);
    return [];
  }
};

const createBlog = async (blogObj) => {
  try {
    const token = getToken();
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogObj),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", response.status, errorData);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("unable to create blog", error);
    return null;
  }
};

export default { getAll, createBlog };
