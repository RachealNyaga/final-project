import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Question from './components/Question';
import Questions from './components/Questions';
import Register from './components/Register';
import Home from './components/Home';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <NavBar />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
