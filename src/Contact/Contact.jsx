import React, {useState} from 'react'
import deleteImg from '../img/delete.png'
import updateImg from '../img/update.png'
import check from '../img/check.jpg'
import s from '../Contacts/Contacts.module.css'

const Contact = (props) => {
    const [updateMode,setUpdateMode] = useState(false)
    const [clickedUser,setClickedUser] = useState(null)
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const [number,setNumber] = useState('')
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
        props.takeFullInfo(true)
        props.setId(id)
    }
    const DeleteCurrentContact = (id)=>{
        props.takeFullInfo(false)
        props.setId(null)
        props.DeleteContact(id)
    }
   
    const ClickUpdateButton = (key,name,mail,number) => {
        setUpdateMode(true)
        setClickedUser(key)
        setName(name)
        setMail(mail)
        setNumber(number)
    }
    console.log(props.key_id)
    return (
                <tr className = {s.tr}>
                <td>{props.key_id+1}</td>    
                <td onClick = {()=>{ShowFullInfo(props.key_id)}}>{updateMode && clickedUser === props.key ? <input onChange ={SetUpdateName} value = {name}/> : props.name}</td>
                <td>{updateMode && clickedUser === props.key_id ? <input onChange = {SetUpdateMail} value = {mail}/> : props.email}</td>
                <td>{updateMode && clickedUser === props.key_id ? <input onChange = {SetUpdateNumber} value = {number}/> : props.number}</td>
                <img alt = '' className ={s.Edite} src = {deleteImg} onClick = {()=>DeleteCurrentContact(props.id)}/>
                {updateMode && clickedUser === props.key_id ?  <img alt = '' src ={check} className ={s.Edite} onClick = {()=>UpdateCurrentContact(props.id,name,mail,number)}/>:
                <img alt = '' className={s.Edite} src ={updateImg} onClick = {()=>ClickUpdateButton(props.key_id,props.name,props.email,props.number)}/>}
                </tr>
              
       
    )
}
export default Contact