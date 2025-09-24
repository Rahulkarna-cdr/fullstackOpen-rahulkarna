
const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogPosts)=>{
    if(blogPosts.length===0){
        return 0;
    }
    if(blogPosts.length===1){
        return blogPosts[0].likes
    }

    return blogPosts.reduce((sum,posts)=> (sum+posts.likes),0)
}

const favoriteBlog = (blogs) =>{
    if(blogs.length === 0){
        return null;
    }
    if(blogs.length ===0){
        return blogs[0]
    }

    let mostLikedBlog = blogs[0]
    blogs.forEach(blog => {
        if(blog.likes > mostLikedBlog.likes){
            mostLikedBlog = blog
        }
    })
    return mostLikedBlog
}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog
}