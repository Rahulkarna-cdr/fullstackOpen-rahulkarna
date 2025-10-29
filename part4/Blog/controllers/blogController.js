const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')


blogRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate("user", {username:1, name:1, id:1})
    response.status(200).json(blogs)
})

blogRouter.post('/', (request, response) => {
  const body = request.body
  const newBlog = new Blog(request.body)
  if(!newBlog.title || !newBlog.url){
  return response.status(400).json({ error: 'url and title both are required' })
  }

  let savedBlog

  newBlog.save().then(result =>{
    savedBlog = result
    return User.findById(body.user)
  })
  .then(user=>{
    if(!user){
      return response.status(404).json({error: "User not found"})
    }

    user.blogs = user.blogs.concat(savedBlog.id)
    return user.save()
  })
  .then(()=>{
    response.status(201).json(savedBlog)
  })
  .catch(error => {
    response.status(500).json({error: "Something went wrong while creating the Blog."})
  })
})  

blogRouter.delete('/:id', async(request,response)=>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id',async (request,response)=>{
   const id = request.params.id
   const { likes } = request.body
   await Blog.findByIdAndUpdate(id,{likes},{ new: true, runValidators: true })
   response.status(200).end()
})

module.exports = blogRouter