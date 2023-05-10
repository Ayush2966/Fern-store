import { Link } from "react-router-dom";
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { signupUser } from 'services/index';
import { useAuth } from 'contexts/index';
import { useToast } from "custom-hooks/useToast";
import { validateForm } from "utils/FormValidation/validateForm";

const Signup = () => {
  const initialSignupFields = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  };

  const formErrorReducer = (formState, { type, payload }) => {
    switch (type) {
      case 'FULLNAME_ERROR':
        return {
          ...formState,
          fullNameError: payload
        }
      case 'PASSWORD_ERROR':
        return {
          ...formState,
          passwordError: payload
        }
      case 'CONFIRM_PASSWORD_ERROR':
        return {
          ...formState,
          confirmPasswordError: payload
        }
      case 'RESET_ERROR':
        return{
          ...formState,
          fullNameError: '',
          passwordError: '',
          confirmPasswordError: ''

        }
      default: return {
        ...formState
      }
    }

  }

  const [formError, setFormError] = useReducer(formErrorReducer, initialSignupFields);

  const [signupFields, setSignupFields] = useState(initialSignupFields);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { showToast } = useToast();

  const fieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupFields({
      ...signupFields,
      [name]: value
    });
  }

  const signupFormHandler = async (e, signupFields) => {
    e.preventDefault();
    console.log(validateForm(setFormError, signupFields));
    if (!validateForm(setFormError, signupFields))
      return;
    try {
      const isSignup = await signupUser(signupFields);

      if (isSignup) {
        showToast('Signup successful!', 'success');
        const { createdUser, encodedToken } = isSignup;
        setAuth({
          token: encodedToken,
          user: createdUser,
          isAuth: true
        });
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify(createdUser));
        setTimeout(() => {
          setSignupFields(initialSignupFields);
          navigate('/Login');
        }, 1000)

      }
    } catch (error) {
      showToast('Signup failed!', 'error');
      console.log(error.message);
    }
  }

  return (
    <div className="login-wrapper d-flex justify-center items-center">
      <div className="login-modal">
        <form className="login-form" onSubmit={(e) => signupFormHandler(e, signupFields)}>
          <h3 className="login-title">Sign up</h3>
          <p className="login-subtitle text-center">Enter email and password</p>
          <div className="input-container">
            <label className="input-label" htmlFor="fullName">Full Name</label>
            <input
              className="input-section"
              type="text"
              id="fullName"
              name="fullName"
              value={signupFields.fullName}
              placeholder="Full Name"
              required
              onChange={(e) => fieldChangeHandler(e)}
            />
          {formError.fullNameError && <small className='error-msg'>{formError.fullNameError}</small>}
          </div>
          
          <div className="input-container">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              className="input-section"
              type="email"
              id="email"
              name="email"
              value={signupFields.email}
              placeholder="Email"
              required
              onChange={(e) => fieldChangeHandler(e)}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="pwd">Password</label>
            <input
              className="input-section"
              type="password"
              id="pwd"
              name="password"
              value={signupFields.password}
              placeholder="Password"
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
            {formError.passwordError && <small className='error-msg'>{formError.passwordError}</small>}
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="confirm-pwd">Confirm Password</label>
            <input
              className="input-section"
              type="password"
              name="confirmPassword"
              value={signupFields.confirmPassword}
              id="confirm-pwd"
              placeholder="Confirm Password"
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
            {formError.confirmPasswordError && <small className='error-msg'>{formError.confirmPasswordError}</small>}
          </div>
          <label className="input-label text-sm" htmlFor="pwd-store">
            <input type="checkbox" name="" id="pwd-store" />
            I accept all the terms and conditions
          </label>

          <button
            className="bttn bttn-primary bttn-block"
            disabled={formError.fullName}>CREATE ACCOUNT</button>
          <p className="sub-text text-sm text-center">Already have an account?
            <Link className="text-sm bold link-text-primary" to='/Login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export { Signup };