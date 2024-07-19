import React, { useState } from 'react';
import './LoginSignup.css';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleGoback = () => {
        navigate('/')
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3500/user/', data);
            console.log(response.data);
            setData({
                name: "",
                email: "",
                password: ""
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleLogin = async () => {
        try {
            let response = await axios.post('http://localhost:3500/user/login', {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                navigate('/Home', { state: { data } })
                console.log(response.data, "Login successful");
            } else {
                console.log("Login failed");
            }
        } catch (err) {
            alert(err.response.data.message)

        }
    };

    const handleSubmit = (action) => {
        if (action === "Sign Up") {
            handleRegister();
        } else {
            handleLogin();
        }
    };
    const handleClick = (a) => {
        setAction('Login')
        console.log(a)
        navigate('/')
    }
    return (
        <div className='container'>
            <div className="header">
                <div className="text">
                    {action}
                </div>
                <div className="underline"></div>
            </div>
            <form className="inputs"
            >
                {action === "Login" ? null : (
                    <div className="input">
                        <FaUser className='input-img' />
                        <input
                            type="text"
                            placeholder='Enter your Name'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="input">
                    <MdEmail className='input-img' />
                    <input
                        type="email"
                        placeholder='Enter your Email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input">
                    <RiLockPasswordFill className='input-img' />
                    <input
                        type="password"
                        placeholder='Enter your Password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {action === "Sign Up" ? null : (
                    <div className="forgot-password">
                        Lost Password? <span>Click Here</span>
                    </div>
                )}
                {action === "Login" ? null : <div className="submit-container">
                    <button onClick={handleGoback} className='back'>Go Back</button>
                    <button type="submit" className="submit"
                        onClick={() => handleSubmit(action)}>
                        {action}
                    </button>
                    
                </div>}



            </form>
            {action == "Login" && (
                <div className="submit-container toggle-action">
                    <div
                        className={action === "Login" ? "submit gray" : "submit"}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={() => handleSubmit(action)}
                    >
                        Login
                    </div>
                </div>
            )}

        </div>
    );
};

export default LoginSignup;

