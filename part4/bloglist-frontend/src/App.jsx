import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
      localStorage.setItem("loggedUser",JSON.stringify(user))

    } catch {
      setErrorMessage('Invalid credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
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

  const handleLogOut = ()=>{
    localStorage.removeItem("loggedUser")
    setUser(null)
  }

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    setUser(loggedUser)
  const fetchBlogs = async () => {
  const blogs = await blogService.getAll();
  console.log("fetched Blogs", blogs)
  setBlogs(blogs);
};
fetchBlogs()
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
        </>
      )}
    </div>
  );
};

export default App;