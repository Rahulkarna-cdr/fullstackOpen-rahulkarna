import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notify,setNotify] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle,setToggle] = useState(false)

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
      if(!user){
        setUser(null)
      }
      setUser(user);
      setUsername("");
      setPassword("");
      localStorage.setItem("loggedUser", JSON.stringify(user));

      // Fetch blogs after successful login
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch {
      setErrorMessage("wrong username or password");
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

      if (newBlogs) {
        setBlogs((blogs) => [...blogs, newBlogs]);
        setNotify(`a new blog ${newBlogs.title} by ${newBlogs.author} added`);
        setFormData({ title: "", author: "", url: "" });
        setTimeout(() => {
          setNotify("");
        }, 5000);
      }
    };
    postBlogs();
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    setUser(loggedUser);

    // Only fetch blogs if user is logged in
    if (loggedUser) {
      const fetchBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      };
      fetchBlogs();
    }
  }, []);


return (
  <div>
<Notification msg = {errorMessage} notification = {notify} />
    {!user && loginForm()}
    {user && (
      <>
        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={handleLogOut}>Logout</button>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
        <br />
        <div>
          <button onClick={()=>setToggle(true)}>Create new Blog</button>
        {toggle && <NoteForm title={formData.title} author={formData.author} url={formData.url} handleCreate ={handleCreate} handleChange={handleChange} setToggle={setToggle}/> }
        
        </div>
      </>
    )}
  </div>
);
};


export default App;
