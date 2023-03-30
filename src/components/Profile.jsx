import React, { useState, useEffect } from 'react';
import user from "../assets/User.jpg";

function Profile() {
  const [questionsAsked, setQuestionsAsked] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    // function to get the number of questions asked by the user from the database
    async function getQuestionsAsked() {
      const response = await fetch(`questions/${loggedInUser.id}`);
      const data = await response.json();
      setQuestionsAsked(data.count);
    }
    getQuestionsAsked();

    // function to get the number of questions answered by the user from the database
    async function getQuestionsAnswered() {
      const response = await fetch(`question/answer/${loggedInUser.uid}`);
      const data = await response.json();
      setQuestionsAnswered(data.count);
    }
    getQuestionsAnswered();
  }, [loggedInUser.uid]);

  return (
    <div className='profile'>
      <div className="profile-left">
        <img src={loggedInUser.providerData[0].photoURL} alt="" />
        <br />
        <h3>{loggedInUser.providerData[0].displayName}</h3>
        <p><strong>{loggedInUser.providerData[0].email}</strong></p>
      </div>

      <div className="profile-right">
        <div className="data">
          <h6>{questionsAsked}</h6>
          <p>Questions asked</p>
        </div>
        <div className="data">
          <h6>{questionsAnswered}</h6>
          <p>Questions answered</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
