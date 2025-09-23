
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

module.exports={
    dummy,
    totalLikes
}