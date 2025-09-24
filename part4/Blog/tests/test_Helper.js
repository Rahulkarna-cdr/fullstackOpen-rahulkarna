const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "A space odyessey",
        Author: "David Harbour",
        url: "www.thespaceodyessey.com",
        likes: 156
    },
    {
        title: "An Unknown way",
        Author: "Emma Watson",
        url: "www.unknownwaybyemma.com",
        likes: 458
    },
    {
        title: "A lost stranger",
        Author: "Penniwise the great",
        url: "www.welcometoderby.com",
        likes: 15
    }
]

    const nonExistingValidID = async()=>{
        const blog = new Blog(
            {
                title: "A new Journey to software engineering",
                Author: "Emil Brown",
                url:"www.newjourneybyemil.com",
                likes: 1
            })
            await blog.save()
            await blog.deleteOne()

            return blog._id.toString()
    }

    const blogsInDb = async() =>{
        const blogs = await Blog.find({})
        return blogs.map(blog => blog.toJSON())

    }
module.exports = {
    initialBlogs,
    nonExistingValidID,
    blogsInDb

}
