import { FETCH_QUESTIONS, FETCH_QUESTION, NEW_QUESTION } from './types';

import { db } from "../config"
import { doc, collection, getDocs, getDoc, addDoc } from "firebase/firestore";

export async function fetchQuestions (dispatch) {
    const querySnapshot = await getDocs(collection(db, "questions"));
    let docs = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        docs.push({id:doc.id, data: doc.data()});
    });
    dispatch({
        type: FETCH_QUESTIONS, 
        payload: docs
    })
};


export const fetchQuestion = questionId => async dispatch => {
  
    const docRef = doc(db, "questions", questionId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        dispatch({
            type: FETCH_QUESTION,
            payload: docSnap.data()
        })
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
};


export const createQuestion = question => async dispatch => {
  
    console.log(question)

    const docRef = await addDoc(collection(db, "questions"), {
        title: question.question, 
        user: question.loggedInUser,
        upvotes: 0,
        downvotes: 0
    });
    console.log("Document written with ID: ", docRef.id);
    dispatch({
        type: NEW_QUESTION,
        payload: docRef.id
    })
};