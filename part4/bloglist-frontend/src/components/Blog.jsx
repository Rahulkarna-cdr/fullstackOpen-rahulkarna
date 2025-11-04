import "../main.css";
import { useState } from "react";

  const Blog = ({ blog, handleLike, handleDelete }) => {
  const [blogToggle, setBlogToggle] = useState(false);

  return (
    <div className="BlogOutline">
      {blog.title}{" "}
      <button onClick={() => setBlogToggle(!blogToggle)}>
        {blogToggle ? "hide" : "view"}
      </button>
      {blogToggle && (
        <div>
          {blog.url} <br />
          Likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>like</button>
          <br />
          {blog.author} {" "}
          <button className="delete" onClick={()=>handleDelete(blog)}>remove</button>
        </div>
      )}
    </div>
  );

};

export default Blog;
