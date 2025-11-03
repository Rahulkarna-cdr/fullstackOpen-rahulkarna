import "../main.css"
import { useState } from "react"

const Blog = ({ blog }) => {
  
  const [blogToggle, setBlogToggle] = useState(false)
  return(
  
  <div className="BlogOutline"> 
    {blog.title} <button onClick={()=>setBlogToggle(!blogToggle)}> {blogToggle?'hide':'view'}</button>
    
    {blogToggle && <div>
    {blog.url} <br />
    Likes: {blog.likes} <br />
    {blog.author} 
    </div>}

  </div>  
)}

export default Blog