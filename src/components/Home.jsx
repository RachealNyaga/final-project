import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className='container'>
        <div className='home'>
    <h1>Welcome To Questions Platform.</h1>
    <p>Ask anything and get answers from the community<br/> Do you have an account?
  <br/>  <Link to="/login">Login</Link></p>
  <h4>Dont have an account? <br/>Become a member of questions platform</h4>
<p> <Link to="/register">Register</Link></p>
    
    </div>
    </div>
  )
}

export default Home