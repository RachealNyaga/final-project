import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from "../config"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuestion } from '../actions/questionActions';

function Question() {
  ///////////////////////////////////
  const dispatch = useDispatch()
  const question = useSelector((state) => state.questions.question)
  console.log(question)
  ////////////////////////////////////

  let [answer, setAnswer] = useState("");
  let [comment, setComment] = useState("");

  // Get id from the query string
  let { id } = useParams();

  // Fech from firestore
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [])
  
  // Answer this Question
  async function answerQuestion(event) {
    event.preventDefault();
    console.log(id);

    const questionRef = doc(db, 'questions', id);
    setDoc(questionRef, { answers: arrayUnion({id: new Date().getTime().toString(), answer, comments: []}) }, { merge: true });
  }

  // Add comment
  function handleSetComment(e) {
    e.preventDefault();

    console.log(comment)
  }
  return (
    <div>
        {! question ? 
        "" 
        : 
        <>
            <h1>{question.title}</h1>
            <ul>
            {question.answers && question.answers.map(function(answer) {
                return (
                    <li className='answer'>
                        <p>{answer.answer}</p>
                        <form action="" onSubmit={e => handleSetComment(e)}>
                          <input type="text" onChange={e => setComment(e.target.value)}/>
                          <button type="button" className="vote up"><i class="fa-solid fa-thumbs-up"></i></button>
                          <button type="button" className="vote down"><i class="fa-solid fa-thumbs-down"></i></button>
                          <button type="submit">Comment</button>
                        </form>
                    </li>
                )
            })}
            </ul>
        </>
        }
        <form onSubmit={event => answerQuestion(event)}>
          <input type="text" onChange={(e) => setAnswer(e.target.value)}/>
          <button type="submit" onClick={answerQuestion}>Answer this Question</button>
        </form>
    </div>
  )
}

export default Question
