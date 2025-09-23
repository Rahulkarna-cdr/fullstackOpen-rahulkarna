const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithNoBlog = [];
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(listWithNoBlog);
    assert.strictEqual(result,0);
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  const listWithManyBlog = [
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "The Art of Computer Programming",
      author: "Donald E. Knuth",
      url: "https://www-cs-faculty.stanford.edu/~dk/",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fa",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      url: "https://mitpress.mit.edu/books/introduction-algorithms",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fb",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
      likes: 25,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fc",
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      url: "https://www.oreilly.com/library/view/design-patterns-elements/9780201633610/",
      likes: 15,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fd",
      title: "Refactoring: Improving the Design of Existing Code",
      author: "Martin Fowler",
      url: "https://martinfowler.com/books/refactoring.html",
      likes: 20,
      __v: 0,
    },
  ];

  test("of a bigger list is calculated right",()=>{
    const result = listHelper.totalLikes(listWithManyBlog)
    assert.strictEqual(result,80)
  })
});
