  import React, { useState } from 'react';
  import axios from 'axios';

  function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/login', { username, password });
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
      } catch (error) {
        setError('Invalid username or password');
      }
    };

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {loggedIn && (
                  <div>
                    <h3>Welcome to User Page</h3>
                    {/* Add your user page content here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default LoginForm;
