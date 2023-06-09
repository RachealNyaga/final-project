import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo.png'

function NavBar() {
  let navigate = useNavigate();
  let [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("user")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [])

  function handleLogout() {
    sessionStorage.removeItem("user");
    setLoggedIn(false);
    return navigate("/"); // Redirect user to homepage
  }
  
  return (
    <div className='nav'>
        <div className='logo'>
            <Link to={"/"}> <img src={Logo} alt="" /></Link>
           
        </div>
        <div className="search">
            <input
              type="search"
              name=""
              id="search"
              placeholder={`search your question`}
            />
          </div>

        <ul>
          
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/questions"}>Questions</Link></li>
            {loggedIn ? <li><Link to={"/profile"}>Profile</Link></li> : ""}
            {loggedIn !== <li><Link to={"/Login"}>Login</Link></li> }
            {loggedIn ? <li><button onClick={handleLogout}>Logout</button></li> : ""}
        </ul>
    </div>
  )
}

export default NavBar
