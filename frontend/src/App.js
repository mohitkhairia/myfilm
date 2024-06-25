import logo from './logo.svg';
import './App.css';
import React from 'react'
import{BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import ConferenceList from './components/ConferenceList';
import FeedbackForm from './components/FeedbackForm';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h1>Conference Management App</h1>
          <nav>
            <ul>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/conferences">Conferences</a>
              </li>
              <li>
                <a href="/feedback">Feedback</a>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/register"
              element={<RegistrationForm />}
            />
            <Route path="/login"
              element={<LoginForm />}
            />
            <Route path="/conferences"
              element={<ConferenceList />}
            />
            <Route path="/feedback"
              element={<FeedbackForm />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
