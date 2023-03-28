import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createQuestion } from '../actions/questionActions';

function PostQuestion() {
  ///////////////////////////////////
  const dispatch = useDispatch()
  const questions = useSelector((state) => state.questions)
  let loggedInUser = JSON.parse(sessionStorage.getItem("user"))
  ////////////////////////////////////

  let [question, setQuestion] = useState("");

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createQuestion({question, loggedInUser: loggedInUser.uid}));
    }

    useEffect(() => {
      console.log(questions)
    }, [])
    

  return (
    
    <div className='post-question'>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
           
            
            <input type="text" placeholder="Ask a question" onChange={(e) => setQuestion(e.target.value)}/>
            <br />
            <button>Post</button>
        </form>
    </div>
  )
}

export default PostQuestion