import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotesService"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    voteIncrement: (state, action) => {
      const id = action.payload
      return state.map((anecdote) =>
        anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    },
    setAnecdotes: (state,action)=>{
      return action.payload
    }
  },
});

  
 export const { createAnecdote, voteIncrement, setAnecdotes } = anecdoteSlice.actions
 
 export const getAllAnecdotes = () => {
  return async (dispatch) => {
    const getAllAnecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(getAllAnecdotes))
  }
 }
 export default anecdoteSlice.reducer