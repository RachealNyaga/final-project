import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from "../config"
import { increment , arrayUnion, doc, setDoc } from "firebase/firestore";
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
    await setDoc(questionRef, { 
      answers: arrayUnion({id: new Date().getTime().toString(), answer, comments: []}),
      }, 
      { merge: true }
    );
  }

  // Add comment
  async function handleSetComment(e) {
    e.preventDefault();

    console.log(comment);
    /** Comment functionality */
    // const questionRef = doc(db, 'questions', id);
    // await setDoc(questionRef, { 
    //   'answers': {answer: {comments: arrayUnion({id: new Date().getTime().toString(), comment: comment})}},
    //   }, 
    //   { merge: true }
    // );
  }

  async function upVote() {
    const questionRef = doc(db, 'questions', id);
    await setDoc(questionRef, { upvotes: increment(1)}, { merge: true });
  }
  
  async function downVote() {
    const questionRef = doc(db, 'questions', id);
    await setDoc(questionRef, { downvotes: increment(1)}, { merge: true });
  }
  return (
    <div>
        {! question ? 
        "" 
        : 
        <>
            <h1>{question.title}</h1>
            <div className='answer-wrapper'>
              <div className="ans-votes">
                <div className="upvotes">
                  <button type="button" onClick={upVote} className="vote up"><i class="fa-solid fa-thumbs-up"></i> <span>{question.upvotes}</span></button>
                </div>
                <div className="downvotes">
                  <button type="button" onClick={downVote} className="vote down"><i class="fa-solid fa-thumbs-down"></i> <span>{question.downvotes}</span></button>
                </div>                          
              </div>
            <ul>
            {question.answers && question.answers.map(function(answer) {
                return (
                    <li className='answer'>
                        <p>{answer.answer}</p>
                        <form action="" onSubmit={e => handleSetComment(e)}>
                          <input type="text" onChange={e => setComment(e.target.value)}/>
                          <button type="submit">Comment</button>
                        </form>
                    </li>
                )
            })}
            </ul>
            </div>
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
