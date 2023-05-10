import './login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";

import { useAuth } from "contexts";
import { loginUser } from "services/authService";
import { useToast } from "custom-hooks/useToast";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/';
    const initalLoginCreds = {
        email: '',
        password: ''
    }
    const testLoginCreds = {
        email: 'shikhasingh@gmail.com',
        password: 'shikhasingh123'
    };
    const [loginCreds, setLoginCreds] = useState(initalLoginCreds);
    const { setAuth } = useAuth();
    const { showToast } = useToast();

    const setLoginFields = (e) => {
        const { value, name } = e.target;
        setLoginCreds((login) => ({ ...login, [name]: value }));
    }

    //login handler with actual login credentials
    const loginFormHandler = async (e, loginCreds) => {
        e.preventDefault();
        try {
            const isLogin = await loginUser(loginCreds);
            if (isLogin) {
                showToast('Login successful!', 'success');
                const { encodedToken, foundUser } = isLogin;
                setAuth(() => ({
                    token: encodedToken,
                    user: foundUser,
                    isAuth: true
                }));
                localStorage.setItem("token", encodedToken);
                localStorage.setItem("user", JSON.stringify(foundUser));
                localStorage.setItem("isAuth", "true");
                setTimeout(() => {
                    setLoginCreds(initalLoginCreds);
                    navigate(from, {replace: true});
                }, 1000)
            }
            else {
                showToast('Login failed!', 'error');
                throw new Error("Failure! Login failed.");
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    //login handler with test login credentials
    const testLoginFormHandler = async (e, loginCreds) => {
        e.preventDefault();
        setLoginCreds(testLoginCreds);
        loginFormHandler(e, loginCreds);
    }

    return (
        <div className="login-wrapper d-flex justify-center items-center">
            <div className="login-modal">
                <form className="login-form" onSubmit={(e) => loginFormHandler(e, loginCreds)}>
                    <h3 className="login-title">Log in</h3>
                    <p className="login-subtitle text-center">Enter email and password</p>
                    <div className="input-container">
                        <label className="input-label" htmlFor="userName">Email</label>
                        <input
                            className="input-section"
                            type="email"
                            id="userName"
                            placeholder="Email"
                            name="email"
                            value={loginCreds.email}
                            onChange={(e) => setLoginFields(e)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label className="input-label" htmlFor="pwd">Password</label>
                        <input
                            className="input-section"
                            type="password"
                            id="pwd"
                            placeholder="Password"
                            name="password"
                            value={loginCreds.password}
                            onChange={(e) => setLoginFields(e)}
                            required
                        />
                    </div>
                    <div className="login-help">
                        <div>
                            <label className="input-label text-sm" htmlFor="pwd-store">
                                <input type="checkbox" name="" id="pwd-store" />
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm">Forgot Password?</a>
                    </div>
                    <button className="bttn bttn-primary bttn-block">LOG IN</button>
                    <button className="bttn bttn-primary bttn-block my-4" onClick={(e) => testLoginFormHandler(e, testLoginCreds)}>LOG IN WITH TEST CREDENTIALS</button>
                    <p className="sub-text text-sm text-center">Don't have an account?
                        <Link className="text-sm bold link-text-primary" to='/Signup'>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export { Login };