import React, { Component } from 'react';
import './index.css';

class BizLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { email, password } = this.state;
    const url = 'http://localhost:3001/auth/biz-login'; // Replace with your endpoint

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed!');
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem('jwtToken', token);
      this.props.onLogin(token);

    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div className="login-page">
        <div className="login-image">
          <img
            src="https://res.cloudinary.com/dx97khgxd/image/upload/v1724834768/Frame_dt1jj9.jpg"
            alt="Login Background"
            className="background-img"
          />
        </div>
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dx97khgxd/image/upload/v1724784364/Screenshot_2024_0828_001335-removebg-preview_g4iwbn.png"
            alt="Logo"
            className="login-logo"
          />
          <h2 className="login-title">Business Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={this.handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BizLogin;
