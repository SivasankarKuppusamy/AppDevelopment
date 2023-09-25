import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 
function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const nav = useNavigate();
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    conPassword: '',
    terms: '',
  });

  const check = () => {
    setIsChecked(!isChecked);
    setFormErrors({ ...formErrors, terms: '' });
  };

  const handleInputChange = (field, value) => {
    setFormErrors({ ...formErrors, [field]: '' });
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'conPassword':
        setConPassword(value);
        break;
      default:
        break;
    }
  };

  const validate = (e) => {
    e.preventDefault();
    const errors = {};

    if (name.length === 0) {
      errors.name = 'Name is required';
    }

    if (email.length === 0) {
      errors.email = 'Email is required';
    }

    if (password.length === 0) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (conPassword.length === 0) {
      errors.conPassword = 'Confirm Password is required';
    } else if (password !== conPassword) {
      errors.conPassword = 'Passwords do not match';
    }

    if (!isChecked) {
      errors.terms = 'Please agree to the Terms and Conditions';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({
        name: '',
        email: '',
        password: '',
        conPassword: '',
        terms: '',
      });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = {
        type: 'student',
        name,
        email,
        password: hashedPassword, 
      };

      localStorage.setItem('user', JSON.stringify(user));
      nav('/login');
    }
  };

  return (
    <div className="student-reg">
      <div className="outer-container">
        <div className="content-container">
          <img
            alt="logo"
            src="https://repository-images.githubusercontent.com/556076311/5baa47be-f8f3-4925-b674-837ee2863d5a"
          />
          <h2>REGISTER AS A STUDENT</h2>
          <form>
            <div>
              <input
                onChange={(e) => handleInputChange('name', e.target.value)}
                type="text"
                placeholder="Name"
              />
              {formErrors.name && <p className="error">{formErrors.name}</p>}
            </div>
            <div>
              <input
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
                placeholder="Email"
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>
            <div>
              <input
                onChange={(e) => handleInputChange('password', e.target.value)}
                type="password"
                placeholder="Password"
              />
              {formErrors.password && <p className="error">{formErrors.password}</p>}
            </div>
            <div>
              <input
                onChange={(e) => handleInputChange('conPassword', e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              {formErrors.conPassword && (
                <p className="error">{formErrors.conPassword}</p>
              )}
            </div>
            <div className="checkbox">
              <input onClick={check} type="checkbox" id="remember" />
              <label htmlFor="remember">I agree to the Terms and Conditions</label>
              {formErrors.terms && <p className="error">{formErrors.terms}</p>}
            </div>
            <button onClick={validate} type="submit">
              Register
            </button>
          </form>
          <h3 className="log">Already have an account? &nbsp;</h3>
          <h3 id="log">
            <Link id="register" to="/login">
              Login !
            </Link>
          </h3>
        </div>
        <div className="image-container"></div>
      </div>
    </div>
  );
}

export default Signup;
