import React from 'react'
import s from './FullInfo.module.css'

const FullInfo = (props) => {
    return (
        <div className = {s.fullInfo}>
        Подробная информация
        <table>
            <tr>
                <td>Имя:</td>
                <td> {props.contacts[props.idFullInfo].name}</td>
            </tr>
            <tr>
                <td>Почта:</td>
                <td> {props.contacts[props.idFullInfo].email}</td>
            </tr>
            <tr>
                <td>Номер:</td>
                <td> {props.contacts[props.idFullInfo].number}</td>
            </tr>
            <tr>
                <td>Страна:</td>
                <td> {props.contacts[props.idFullInfo].country}</td>
            </tr>
            <tr>
                <td>Город:</td>
                <td> {props.contacts[props.idFullInfo].city}</td>
            </tr>
        </table>
        </div>
    )
}

export default FullInfo