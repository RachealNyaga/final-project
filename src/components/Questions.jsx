import React, {useState, useEffect} from 'react'
import PostQuestion from './PostQuestion'
import { Link } from 'react-router-dom';
import { db } from "../config"
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuestions } from '../actions/questionActions';

function Questions() {
    ///////////////////////////////////
    const dispatch = useDispatch()
    const questions = useSelector((state) => state.questions)
    console.log(questions)
    ////////////////////////////////////

    let [error, setError] = useState(false);
    let [savedQuestions, setSavedQuestions] = useState([]);

    useEffect(() => {
        if(! sessionStorage.getItem("user")) {
            setError(true);
        } else {
            dispatch(fetchQuestions);
        }
    }, [])
    
    
    // Handle deleting a question
    async function handleDelete(question) {
        let loggedInUser = JSON.parse(sessionStorage.getItem("user")).uid;

        let id = question.question.id;

        let user = question.question.data.user
        console.log(user, loggedInUser)
        // delete question that has the id passed in the arguments
        if(user == loggedInUser) {
            await deleteDoc(doc(db, "questions", id));
        } else {
            alert("Only admin can delete this question")
        }
    }
  return (
    <div className='quiz'>
        <PostQuestion />
        
        {error ?
        <div className="error"><p>You need to login to view the questions</p></div>
        :
        questions.items.map(function(question) {
            return(
                <div className='question' key={question.id}>
                    <h3>{question.data.title}</h3>
                    <Link to={"/question/" + question.id}>View More</Link>
                    <button onClick={() => handleDelete({question})}>Delete</button>
                </div>
            )
        })}
        

    </div>
  )
}

export default Questions
