import React from 'react'
import s from '../Contacts/Contacts.module.css'


const Input = (props) => {
    return (
        <input  placeholder={props.placeholder} className={s.search} onChange={props.onChangeFunc}/>
    )
}

export default Input