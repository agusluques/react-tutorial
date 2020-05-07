import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import {updateObject, validate} from '../../shared/utility'


const Auth = (props) => {
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [signUp, setSignUp] = useState(false);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath('/')
        }
    }, [])

    const inputChangedHandler = (event, inputIdentifier) => {
        const newElement = updateObject(loginForm[inputIdentifier], {
            value: event.target.value,
            valid: validate(event.target.value, loginForm[inputIdentifier].validation),
            touched: true
        })       
        
        const newForm = updateObject(loginForm, {[inputIdentifier]: newElement});

        let formIsValid = true;

        for (let form in newForm) {
            formIsValid = newForm[form].valid && formIsValid
        }

        setFormIsValid(formIsValid);
        setLoginForm(newForm);
    }

    const switchAuthModeHandler = () => {
        setSignUp(!signUp);
    }

    const sumbitHandler = (event) => {
        event.preventDefault();
        props.onAuth(loginForm.email.value, loginForm.password.value, signUp)
    }

    let inputs = [];

    for (let input in loginForm) {
        inputs.push(
            <Input
                key={input}
                elementType={loginForm[input].elementType}
                elementConfig={loginForm[input].elementConfig}
                value={loginForm[input].value}
                changed={(event) => inputChangedHandler(event, input)}
                invalid={!loginForm[input].valid}
                shouldValidate={loginForm[input].validation}
                touched={loginForm[input].touched}>
            </Input>
        )
    }
    let form = <Spinner></Spinner>

    if (!props.loading) {
        form = (<form onSubmit={sumbitHandler}>
            {inputs}
            <Button btnType='Success' disabled={!formIsValid}>SUBMIT</Button>
        </form>);
    }

    const errorMessage = props.error ? <p>{props.error.message}</p> : null;

    const authRedirect = props.isAuthenticated ? <Redirect to={props.authRedirectPath}></Redirect> : null;

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button btnType='Danger' clicked={switchAuthModeHandler}>Switch to {signUp ? 'SignIn' : 'SignUp'}</Button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);