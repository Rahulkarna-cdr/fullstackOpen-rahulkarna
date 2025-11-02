import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      console.log(user)
      setUsername("");
      setPassword("");
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch {
      setErrorMessage("Invalid credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>log in to application</h3>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogOut = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const postBlogs = async () => {
      const newBlogs = await blogService.createBlog({
        title: formData.title,
        author: formData.author,
        url: formData.url,
        user: user.id
      });
      setBlogs(blogs => [...blogs, newBlogs]);
      setFormData({ title: "", author: "", url: "" });
      
    };
    postBlogs();
  };

useEffect(() => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  setUser(loggedUser);
  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };
  fetchBlogs();
}, []);


return (
  <div>
    {!user && loginForm()}
    {user && (
      <>
        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={handleLogOut}>Logout</button>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
        <div>
          <h2>Create New Blogs</h2>
          <form onSubmit={handleCreate}>
            <div>
              <label>
                title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                author:
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                url:
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </>
    )}
  </div>
);
};


export default App;
