import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from "../config"
import { doc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuestion } from '../actions/questionActions';

function Question() {
  ///////////////////////////////////
  const dispatch = useDispatch()
  const question = useSelector((state) => state.questions.question)
  console.log(question)
  ////////////////////////////////////

  let [answer, setAnswer] = useState("");

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
    setDoc(questionRef, { answers: [answer] }, { merge: true });
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
                        <p>{answer.answerTitle}</p>
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
