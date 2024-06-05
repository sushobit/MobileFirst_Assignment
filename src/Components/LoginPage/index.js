import React, { useState } from 'react';
import HomePage from '../HomePage';
import './styles.css'; // Import your CSS file

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    // Simulated login logic, replace with your actual backend API call
    if (email.value === 'example@email.com' && password.value === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid Username or Password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const authUrl = 'https://accounts.google.com/o/oauth2/auth';
      const clientId = '489820379845-6l2ssdif1jg4424iaab7421cfh2tjotn.apps.googleusercontent.com'; // Replace with your Google OAuth Client ID
      const redirectUri = 'http://localhost:3000/oauth2callback'; // Replace with your redirect URI
      const responseType = 'token';
      const scope = 'email profile openid';

      const url = `${authUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

      // Open Google OAuth consent page in a new window
      const newWindow = window.open(url, '_blank', 'width=600,height=600');

      // Handle token retrieval from the redirected URI after successful authentication
      const handleToken = (event) => {
        const { origin, data } = event;
        if (origin === window.location.origin && data && data.type === 'googleAuth' && data.token) {
          setIsLoggedIn(true);
          setError('');
          // Close the popup window after successful login
          newWindow.close();
          window.removeEventListener('message', handleToken);
        }
      };

      // Listen for messages from the popup window
      window.addEventListener('message', handleToken);
    } catch (error) {
      setError('Failed to initiate Google login. Please try again.');
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        {!isLoggedIn ? (
          <div className="login-form">
            <h1 className="welcome">Welcome</h1>
            <form onSubmit={handleEmailPasswordLogin} className="form">
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit" className="button">
                Login with Email/Password
              </button>
            
            <button onClick={handleGoogleLogin} className="button google">
              Login with Google
            </button>
            {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        ) : (
          <HomePage />
        )}
      </div>
    </div>
  );
};

export default Login;
