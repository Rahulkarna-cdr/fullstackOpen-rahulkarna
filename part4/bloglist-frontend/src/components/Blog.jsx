import "../main.css"
import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  
  const [blogToggle, setBlogToggle] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    const newLikes = likes + 1;
    try {
      const updatedBlog = await blogService.updateLikes(blog.id, newLikes);
      if (updatedBlog) {
        setLikes(updatedBlog.likes);
      }
    } catch (error) {
      console.error("Failed to update likes", error);
    }
  };

  return(
  
  <div className="BlogOutline"> 
    {blog.title} <button onClick={()=>setBlogToggle(!blogToggle)}> {blogToggle?'hide':'view'}</button>

    {blogToggle && <div>
    {blog.url} <br />
    Likes: {likes} <button onClick={handleLike}>like</button><br />
    {blog.author} 
    </div>}

  </div>  
)}

export default Blog