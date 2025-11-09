import React, { useEffect } from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { getAllAnecdotes } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const filteredData = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedData = filteredData.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notify(`You voted '${anecdote.content}'`))
  };

  useEffect(()=>{
      dispatch(getAllAnecdotes())
    },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedData.map((anecdote) => (
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
