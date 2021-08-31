import React, { useReducer, useState } from 'react';
import className from 'classnames';

const emailReducer = (state, action) => {    
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes('@') }
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes('@') }
    }
    return { value: '', isValid: false }
}



const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 }
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }
    return { value: '', isValid: false }
}


const Login = (props) => {

    const [emailState, validateEmail] = useReducer(emailReducer, {
        value: "",
        isValid: ''
    });

    const [pswState, validatePsw] = useReducer(passwordReducer, {
        value: "",
        isValid: ''
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const emailChangeHandler = (event) => {
        validateEmail({ type: "USER_INPUT", val: event.target.value })
        setFormIsValid(event.target.value.includes('@') && pswState.isValid)
    };

    const passwordChangeHandler = (event) => {
        validatePsw({ type: "USER_INPUT", val: event.target.value })
        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };


    const validateEmailHandler = () => {
        validateEmail({ type: "INPUT_BLUR" })
    };

    const validatePasswordHandler = () => {
        validatePsw({ type: "INPUT_BLUR" })
    };


    const submitHandler = () =>{
        props.onLogin();
    }

    return (
        <React.Fragment>
            <div className="w-50 login-section">
                <h4 className="mb-4 text-center">Login</h4>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className={emailState.isValid === false ? 'form-invalid' : 'form-control'} placeholder="Enter Email" type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} autoComplete="off" />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className={pswState.isValid === false ? 'form-invalid' : 'form-control'} placeholder="Enter Password" type="password" id="password" onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler} />
                </div>
                <div className="text-center">
                    <button type="submit" className="login-btn" disabled={!formIsValid} onClick={submitHandler}>Login</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;