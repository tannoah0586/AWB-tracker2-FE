import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import './SignUpForm.css'; // Import the CSS

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const { username, email, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== passwordConf) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const newUser = await signUp({ username, email, password });
      console.log('Signup successful:', newUser);
      setMessage('Signup successful. Redirecting...');
      setUser(newUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <main className="signup-form-container">
      <h1 className="signup-form-title">Sign Up</h1>
      <p className="signup-form-message">{message}</p>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConf" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="passwordConf"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-buttons">
          <button className="form-button submit-button" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <button onClick={() => navigate('/')} className="form-button cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;