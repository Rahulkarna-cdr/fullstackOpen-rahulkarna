const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if(!blog.title || !blog.url){
  return response.status(400).json({ error: 'url and title both are required' })
  }

  blog.save().then((result) => {
    response.status(201).json(result)
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