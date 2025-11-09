import React, { useEffect } from "react";
import { setAnecdotes, voteIncrement } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotesService"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteIncrement(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(()=>{
      dispatch(clearNotification())
    },5000)
  };

  useEffect(()=>{
    const gettingAnecdotes = async ()=>{
      const anecdotes = await anecdotesService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
    gettingAnecdotes()
  },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
