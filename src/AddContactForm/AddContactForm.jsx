import React from 'react'
import s from './AddContactForm.module.css'
import { useState } from 'react'


const AddContactForm = (props) => {
    const [name,setName] = useState('');
    const [mail,setMail] = useState('');
    const [number,setNumber] = useState('');
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')
    const [Error,setError] = useState('')

    const NameChanger = (e) => {
        setName(e.currentTarget.value)
    }
    const MailChanger = (e) => {
        setMail(e.currentTarget.value);
    }
    const NumberChanger = (e) => {
        setNumber(e.currentTarget.value);
    }
    const CountryChanger = (e) => {
        setCountry(e.currentTarget.value);
    }
    const CityChanger = (e) => {
        setCity(e.currentTarget.value);
    }

    const AddNewContact = (name,mail,number,country,city) =>{
        if (name === '' || mail === '' || number === ''){
            setError('Заполните все поля');
        }
        else{
            let mailCheck = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
            let nameCheck = new RegExp (/^[а-яё]*$/i);
            let numberCheck = new RegExp (/[0-9]/);
            let test1 = mailCheck.test(mail);
            let test2 = nameCheck.test(name);
            let test3 = nameCheck.test(country);
            let test4 = nameCheck.test(city);
            let test5 = numberCheck.test(number)
        if (test1 && test2 && test3 && test4 && test5 ){
            props.AddContact(name,mail,number,country,city);
            props.setButtonClick(false);
        }
        else {setError('Проверьте правильность заполнения полей')}
            
        }
      

    }
    return (
        <div className = {s.container}>
              <div onClick = {()=>props.setButtonClick(false)}
             className = {s.close}>
        </div>
        <div className={s.title}>Заполните поля</div>
            <table className = {s.addingTable}>
                <tbody>
                    <tr>
                        <td>Имя</td>
                        <td><input placeholder ='Имя' value = {name} onChange = {NameChanger}/></td>
                    </tr>
                    <tr>
                        <td>Почта</td>
                        <td><input placeholder='example@mail.ru' value = {mail} onChange = {MailChanger}/></td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td><input placeholder='Телефон' value = {number} onChange = {NumberChanger}/></td>
                    </tr>
                    <tr>
                        <td>Страна</td>
                        <td><input placeholder='Страна' value = {country} onChange = {CountryChanger}/></td>
                    </tr>
                    <tr>
                        <td>Город</td>
                        <td><input placeholder='Город' value = {city} onChange = {CityChanger}/></td>
                    </tr>
                </tbody>
            </table>
    {Error ==='' ? '':<div className = {s.error}>{Error}</div>}
            <button className ={s.addButton} onClick = {()=>AddNewContact(name,mail,number,country,city)}>Добавить</button>
        </div>
    )
}

export default AddContactForm