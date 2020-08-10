import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from './Contacts.module.css'
import { useState } from 'react';
import deleteImg from '../img/delete.png'
import updateImg from '../img/update.png'
import check from '../img/check.jpg'
import {AddContact,SetAuthOut,DeleteContact,UpdateContact,FilterForContacts} from '../redux/Reducer'
import AddContactForm from '../AddContactForm/AddContactForm';


const Contacts = (props) =>{
    let contacts=[];
    if (props.findUserText === ''){
        contacts = [...props.contacts]
    }
    else {contacts = [...props.filteredList]}
    const [isAddButtonClick,setButtonClick] = useState(false)
    const [updateMode,setUpdateMode] = useState(false)
    const [clickedUser,setClickedUser] = useState(null)
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const [number,setNumber] = useState('')
    const [idFullInfo,setId] = useState(null)
    const [isFullInfo,takeFullInfo] = useState(false)


    const SetUpdateName = (e) => {
        setName(e.currentTarget.value)
    }
    const SetUpdateMail = (e) => {
        setMail(e.currentTarget.value)
    }
    const SetUpdateNumber = (e) => {
        setNumber(e.currentTarget.value)
    }
    const UpdateCurrentContact = (id,name,mail,number) =>{
        props.UpdateContact(id,name,mail,number)
        setName('');
        setNumber('');
        setMail('');
        setUpdateMode(false);
    }
    const ShowFullInfo =(id ) => {
        takeFullInfo(true)
        setId(id)
    }
    const DeleteCurrentContact = (id)=>{
        takeFullInfo(false)
        setId(null)
        props.DeleteContact(id)
    }
   
    const ClickUpdateButton = (key,name,mail,number) => {
        setUpdateMode(true)
        setClickedUser(key)
        setName(name)
        setMail(mail)
        setNumber(number)
    }
    const FilteredList = (e)=>{
        props.FilterForContacts(e.currentTarget.value)
    }

    if (props.isAuth === false) return <Redirect to={'/login'} />;
    return(
        <div className = {s.container}>
            <button className={s.outButton} onClick = {()=>props.SetAuthOut()}>Выйти</button>
            <input placeholder='Найти...' className={s.search} onChange={FilteredList}/>
            <table className = {s.table}>
                <thead>
                <tr className = {s.tr}>
                <td>Номер</td>    
                <td>ФИО</td>
                <td>Почта</td>
                <td>Номер телефона</td>
                <td></td>
                </tr>
                </thead>
                <tbody>
                {contacts.map((x,key) => 
                    <tr className = {s.tr}>
                <td>{key+1}</td>    
                <td onClick = {()=>{ShowFullInfo(key)}}>{updateMode && clickedUser === key ? <input onChange ={SetUpdateName} value = {name}/> : x.name}</td>
                <td>{updateMode && clickedUser === key ? <input onChange = {SetUpdateMail} value = {mail}/> : x.email}</td>
                <td>{updateMode && clickedUser === key ? <input onChange = {SetUpdateNumber} value = {number}/> : x.number}</td>
                <img className ={s.Edite} src = {deleteImg} onClick = {()=>DeleteCurrentContact(x.id)}/>
                {updateMode && clickedUser === key ?  <img src ={check} className ={s.Edite} onClick = {()=>UpdateCurrentContact(x.id,name,mail,number)}/>:
                <img className={s.Edite} src ={updateImg} onClick = {()=>ClickUpdateButton(key,x.name,x.email,x.number)}/>}
                </tr>
                )}        
                </tbody>
            </table>
            <button onClick = {()=>setButtonClick(true)}>Добавить</button>
            {isAddButtonClick ? <AddContactForm setButtonClick ={setButtonClick} AddContact = {props.AddContact}/> :''}
                {isFullInfo ? <div className = {s.fullInfo}>
                    Подробная информация
                    <table>
                        <tr>
                            <td>Имя:</td>
                            <td> {props.contacts[idFullInfo].name}</td>
                        </tr>
                        <tr>
                            <td>Почта:</td>
                            <td> {props.contacts[idFullInfo].email}</td>
                        </tr>
                        <tr>
                            <td>Номер:</td>
                            <td> {props.contacts[idFullInfo].number}</td>
                        </tr>
                        <tr>
                            <td>Страна:</td>
                            <td> {props.contacts[idFullInfo].country}</td>
                        </tr>
                        <tr>
                            <td>Город:</td>
                            <td> {props.contacts[idFullInfo].city}</td>
                        </tr>
                    </table>
                    </div>:''}
            </div>

    )
}
const mapStateToProps = (state) =>({
    isAuth:state.Reducer.isAuth,
    contacts:state.Reducer.contacts,
    filteredList:state.Reducer.filteredList,
    findUserText:state.Reducer.findUserText
})

export default connect(mapStateToProps,{AddContact,SetAuthOut,DeleteContact,UpdateContact,FilterForContacts})(Contacts) 