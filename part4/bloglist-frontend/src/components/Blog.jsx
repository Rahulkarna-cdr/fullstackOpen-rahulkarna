import "../main.css"
import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  
  const [blogToggle, setBlogToggle] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = ()=>{
    setLikes(prev => {
    const newLikes = prev + 1;
    blogService.updateLikes(blog.id, newLikes);
    return newLikes;
    })
  }
  return(
  
  <div className="BlogOutline"> 
    {blog.title} <button onClick={()=>setBlogToggle(!blogToggle)}> {blogToggle?'hide':'view'}</button>

    {blogToggle && <div>
    {blog.url} <br />
    Likes: {blog.likes} <button onClick={handleLike}>like</button><br />
    {blog.author} 
    </div>}

  </div>  
)}

export default Blog