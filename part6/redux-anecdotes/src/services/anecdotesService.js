const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new error("something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("unable to fetch data from server");
  }
};



const createAnecdote = async (content) => {
    try{
    const response = await fetch(baseUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content, votes: 0})
    })
    if(!response.ok){
        throw new Error("something went wrong")
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error("unable to create anecdote");
    }
}


const updateVotes = async (anecdote) => {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ votes: anecdote.votes + 1 }),
    });
    if (!response.ok) throw new Error("failed to update votes");
    return response.json();
  };

export default {getAll, createAnecdote, updateVotes};
