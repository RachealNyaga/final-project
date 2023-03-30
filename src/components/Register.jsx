import React, {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();

  let [user, setUser] = useState(
    { // User object
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
    }
  )

// TODO: Add SDKs for Firebase products that you want to use

  function handleRegister(event) {
    event.preventDefault(); // Prevent form from submitting

    if(user.password !== user.confirmPassword) { // check if passwords match
      alert("passwords do not match");
      return; // end program
    }

    if(user.password.length < 7) {  // check password length
      alert("Password too short"); 
      return; // end program
    }

    // Handle Firebase
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        const newUser = userCredential.user;
        // ...
        console.log(user);

        updateProfile(auth.currentUser, {
          displayName:user.username, photoURL: "https://images.unsplash.com/photo-1668420899266-27476b9e8d35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        }).then((res) => {
          // Profile updated!
          console.log(res);
            
            return navigate("/questions"); // Redirect user to questions
        }).catch((error) => {
          // An error occurred
          console.log(error)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage)
      });
  }

  return (
    <div className='container'>
    
   
       <form action="" className='login' required onSubmit={(e) => handleRegister(e)}>
            <label htmlFor="">Name:</label>
            <br/>
            <label htmlFor="">Your user name:</label>
            <br/>
            <input type="text" name="username" required onChange={(e) => setUser({...user, username: e.target.value})}/>
            <br/>
            <label htmlFor="">Your email:</label>
            <br/>
            <input type="email" name="email" required onChange={(e) => setUser({...user, email: e.target.value})}/>
            <br/>
            <label htmlFor="">Enter password:</label>
            <br/>
            <input type="password" name="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
            <br/>
            <label htmlFor="">confirm password:</label>
            <br/>
            <input type="password" name="password" onChange={(e) => setUser({...user, confirmPassword: e.target.value})}/>
            <br/>
            <button type="submit" className="btn">Submit</button>
            <h4>forgot password?</h4>
            <small>Already have an account? <Link to="/login">Login</Link></small>

        </form>
  
    </div>
  )
}

export default Register