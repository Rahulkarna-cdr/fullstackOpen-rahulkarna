const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only("All blogs are returned", async ()=>{
    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body.length, 2)
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
after(async () => {
  await mongoose.connection.close()
})
