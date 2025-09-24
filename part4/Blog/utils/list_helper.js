
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


const mostBlogs = (blogs)=>{
    if(blogs.length===0){
        return 'its empty';
    }
    if(blogs.length===1){
        return `${blogs[0].author} has ${blogs[0].number_of_blogs} blogs`
    }

    let authorWithMoreBlogs = blogs[0]
    blogs.forEach(num=>{
        if(num.number_of_blogs>authorWithMoreBlogs.number_of_blogs){
            authorWithMoreBlogs = num
        }
    })
    return `${authorWithMoreBlogs.author} has the most blogs i.e. ${authorWithMoreBlogs.number_of_blogs}`
}

const mostLikes = (blogs)=>{
    if(blogs.length===0){
        return 'its empty';
    }
    if(blogs.length===1){
        return `${blogs[0].author} has ${blogs[0].likes} likes`
    }

    let authorWithMoreLikes = blogs[0]
    blogs.forEach(num=>{
        if(num.likes>authorWithMoreLikes.likes){
            authorWithMoreLikes = num
        }
    })
    return `${authorWithMoreLikes.author} has the most likes i.e. ${authorWithMoreLikes.likes}`
}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}