
const NewBlog = ({ title, author, url, handleCreate, handleChange, setToggle }) => {
  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          <h2>Create New Blogs</h2>
          <label>
                title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
                author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
                url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      <br />
      <div>
        <button onClick={() => setToggle(false)}>cancel</button>
      </div>


    </div>
  )
}

export default NewBlog