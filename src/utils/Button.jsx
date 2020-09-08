import React from 'react'
import s from '../Contacts/Contacts.module.css'

const Button = (props) => {
    return (
    <button className={s.outButton} onClick = {()=>props.onClickFunc(true)}>{props.action}</button>
    )
}

export default Button