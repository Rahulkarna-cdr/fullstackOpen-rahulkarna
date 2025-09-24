const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Software Architecture: The Hard Parts',
    author: 'Neal Ford',
    url: 'www.nealFord.com',
    likes: 54,
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'www.cleancode.com',
    likes: 75,
  },
  {
    title: 'Design Patterns',
    author: 'Erich Gamma',
    url: 'www.designpatterns.com',
    likes: 100,
  }
]


beforeEach(async ()=>{
    await Blog.deleteMany({})

    let blogObj = new Blog(initialBlogs[0])
    await blogObj.save()

    blogObj = new Blog(initialBlogs[1])
    await blogObj.save()

    blogObj = new Blog(initialBlogs[2])
    await blogObj.save()
})


test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only("All blogs are returned", async ()=>{
    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body.length, 3)
})

test.only('unique identifier property of the blog posts is named id', async()=>{
    const response = await api.get('/api/blogs')
/* In 'response' we have something like this
{
  statusCode: 200,
  headers: { ... },
  body: [ { id: 'abc123', title: 'Blog 1' }, ... ],
  text: '[{"id":"abc123","title":"Blog 1"}]',
  ...
}
  */
    const blogs = response.body
   assert.ok(blogs[0].id, "id property is missing");
})

test.only("blogs are successfully created..", async()=>{
    const newBlog =
        {
            title: 'Journey to the center of the Earth',
            author: 'Martin damsel',
            url: 'www.centerearth.com',
            likes: 46
        }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

     const anotherResponse = await api.get('/api/blogs')
    assert.strictEqual(anotherResponse.body.length, initialBlogs.length+1)
})

test('like property is missing then default to zero', async ()=>{
    const anotherNewBlog = {
        title: 'Refactoring',
        author: 'Martin Fowler',
        url: 'www.refactoring.com'
    }

    const response = await api
    .post('/api/blogs')
    .send(anotherNewBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes,0)
})
after(async () => {
  await mongoose.connection.close()
})
