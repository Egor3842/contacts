import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from './Contacts.module.css'
import { useState } from 'react';
import {AddContact,SetAuthOut,DeleteContact,UpdateContact,FilterForContacts} from '../redux/Reducer'
import AddContactForm from '../AddContactForm/AddContactForm';
import Contact from '../Contact/Contact';
import FullInfo from '../FullInfo/FullInfo';
import Button from '../utils/Button';
import Input from '../utils/Input';


const Contacts = (props) =>{
    let contacts=[];
    if (props.findUserText === ''){
        contacts = [...props.contacts]
    }
    else {contacts = [...props.filteredList]}
    const [isAddButtonClick,setButtonClick] = useState(false)
    
    const [idFullInfo,setId] = useState(null)
    const [isFullInfo,takeFullInfo] = useState(false)


    
    const FilteredList = (e)=>{
        props.FilterForContacts(e.currentTarget.value)
    }
    const Contacts =  contacts.map((x,key) =><Contact email = {x.email}
                                            key_id = {key}
                                            UpdateContact = {props.UpdateContact}
                                            name = {x.name}
                                            number = {x.number}
                                            setId = {setId}
                                            DeleteContact = {props.DeleteContact}
                                            takeFullInfo = {takeFullInfo}
                                            id = {x.id}/>)
    if (props.isAuth === false) return <Redirect to={'/login'} />;
    return(
        <div className = {s.container}>
            <Button  onClickFunc = {props.SetAuthOut} action = 'Выйти'/>
            <Input placeholder='Найти...' onChangeFunc= {FilteredList}/>
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
                    {Contacts}
                </tbody>
            </table>
            <Button onClickFunc={setButtonClick} action = 'Добавить'/>
            {isAddButtonClick ? 
            <AddContactForm setButtonClick ={setButtonClick}
             AddContact = {props.AddContact}/> 
             :''}
                {isFullInfo ? 
               <FullInfo contacts={props.contacts}
               idFullInfo ={idFullInfo} />
               :''}
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