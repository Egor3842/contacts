import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import {SetAuth} from '../redux/Reducer';
import s from './Login.module.css'

const Login = (props) => {
    const [login,setLogin] = useState('')
    const inputLoginInfo = (e) => {
        setLogin(e.currentTarget.value)
    }
    const [password,setPassword] = useState('')
    const inputPasswordInfo = (e) => {
        setPassword(e.currentTarget.value)
    }

    if (props.isAuth) return <Redirect to={'/'} />;
    return (
        <div className = {s.container}>
            <div className = {s.loginForm}>
            <div className={s.header}>Авторизация</div>
            <div className={s.line}></div>
            <div className = {s.inputs}>
            <input placeholder = 'Логин' value = {login} onChange = {inputLoginInfo}/><br/>
            <input placeholder = 'Пароль' type ='password' value = {password} onChange = {inputPasswordInfo}/>
            </div>
           
            <button onClick={()=>props.SetAuth(login,password)}>Войти</button>                
            </div>
            {props.loginError !=='' ? <div className = {s.error}>{props.loginError}</div>:''}
        </div>
    )
}

const mapStateToProps = (state) =>({
    isAuth:state.Reducer.isAuth,
    loginError:state.Reducer.loginError
})

export default connect(mapStateToProps,{SetAuth})(Login) 