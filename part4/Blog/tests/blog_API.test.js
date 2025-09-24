const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");
const testHelper = require("./test_Helper")

const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObj = new Blog(testHelper.initialBlogs[0]);
  await blogObj.save();

  blogObj = new Blog(testHelper.initialBlogs[1]);
  await blogObj.save();

  blogObj = new Blog(testHelper.initialBlogs[2]);
  await blogObj.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("All blogs are returned", async () => {
  const res = await api.get("/api/blogs");

  assert.strictEqual(res.body.length, 3);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  /* In 'response' we have something like this
{
  statusCode: 200,
  headers: { ... },
  body: [ { id: 'abc123', title: 'Blog 1' }, ... ],
  text: '[{"id":"abc123","title":"Blog 1"}]',
  ...
}
  */
  const blogs = response.body;
  assert.ok(blogs[0].id, "id property is missing");
});

test("blogs are successfully created..", async () => {
  const newBlog = {
    title: "Journey to the center of the Earth",
    author: "Martin damsel",
    url: "www.centerearth.com",
    likes: 46,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const anotherResponse = await api.get("/api/blogs");
  assert.strictEqual(anotherResponse.body.length, testHelper.initialBlogs.length + 1);
});

test("like property is missing then default to zero", async () => {
  const anotherNewBlog = {
    title: "Refactoring",
    author: "Martin Fowler",
    url: "www.refactoring.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(anotherNewBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("show 400 Bad request when title or url properties are missing", async () => {
  const brokenBlogs = {
    author: "David Corenswet",
    likes: 78,
  };

  const response = await api
    .post("/api/blogs")
    .send(brokenBlogs)
    .expect(400)
    .expect("Content-Type", /application\/json/);

});

        // test('deletes the blog',async()=>{
        //     const response = await api
        //     .delete("/api/blogs/:id")
        //     .expect(200)

        // })

    test('a blog can be deleted', async () => {
  const blogsAtStart = await testHelper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await testHelper.blogsInDb()

  const titles = blogsAtEnd.map(n => n.title)
  assert(!titles.includes(blogToDelete.content))

  assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length - 1)
})
after(async () => {
  await mongoose.connection.close();
});
