import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email:'',
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

    if (password !== formData.passwordConf) {
        setMessage("Passwords do not match.");
        return;
    }

    try {
        const newUser = await signUp({ username, email, password }); 
            console.log('Signup successful:', newUser);
            setMessage('Signup successful. Redirecting...');
            navigate('/dashboard');
    } catch (error) {
        setMessage(error.message)
    }

  };

  const isFormInvalid = () => {
    return !(username && password && password === formData.passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
            <label htmlFor='email'>Email:</label>
            <input
                type='email'
                id='email'
                value={email}
                name='email'
                onChange={handleChange}
                required
            />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
