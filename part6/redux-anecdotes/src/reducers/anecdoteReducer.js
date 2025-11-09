import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotesService"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // createAnecdote: (state, action) => {
    //   state.push(action.payload)
    // },
    voteIncrement: (state, action) => {
      const updated = action.payload
      return state.map((anecdote) =>
        anecdote.id === updated.id ? updated : anecdote
      );
    },
    setAnecdotes: (state,action)=>{
      return state.concat(action.payload)
    }
  },
});

  
 export const { createAnecdote, voteIncrement, setAnecdotes } = anecdoteSlice.actions
 
export const newAnecdote = (content) => {
  return async(dispatch) =>{
    const postNewAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(setAnecdotes(postNewAnecdote))
  }
}

 export const getAllAnecdotes = () => {
  return async (dispatch) => {
    const getAllAnecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(getAllAnecdotes))
  }
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateVotes(anecdote)
    dispatch(voteIncrement(updatedAnecdote))
  }
};

export default anecdoteSlice.reducer;