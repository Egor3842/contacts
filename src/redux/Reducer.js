

let initialState = {
isAuth:false,
login:'admin',
loginError:'',
password:'111',
findUserText:'',
contacts:[
    {id:1,
    name:'Первый Перв Первович',
    email:'123@mail.ru',
    number:'89777777777',
    country:'Россия',
    city:'Санкт-Петурбург'
    },
    {id:2,
    name:'Второй Втор Вторович',
    email:'234@mail.ru',
    number: '8888888888',
    country:'Россия',
    city:'Казань'
    },
    {id:3,
    name:'Третий Треть Третьевич',
    email:'432@mail.ru',
    number: '234234234',
    country:'Россия',
    city:'Москва'
        }
],
filteredList:[]
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            if (action.login === state.login && action.password === state.password){
                return {...state, isAuth: true,loginError: ''}
            }
            else return {...state,loginError:'Неверно введенный логин или пароль'}
        }
        case LOG_OUT: {
            return {...state,isAuth:false}
        }
        case ADD_NEW_CONTACT:{
            let array = state.contacts;
            let id = 1
            if (array.length !== 0){
                id = array[array.length-1].id+1

            }
            let newContact = {
                id:id,
                name:action.name,
                email:action.mail,
                number:action.number,
                country:action.country,
                city:action.city
            }
            array.push(newContact)
            return {...state, contacts: array}
        }
        case DELETE_CONTACT: {
            let array =[]
            for (let i = 0; i<state.contacts.length;i++){
                if (state.contacts[i].id !== action.user_id){
                    array.push(state.contacts[i])
                }
            }
            return {...state, contacts: array}
        }
        case UPDATE_CONTACT:{
            let updateContact = {
                id:action.user_id,
                name:action.name,
                email:action.mail,
                number:action.number,
               
            }
            let array = []
            for (let i = 0; i<state.contacts.length;i++){
                if (state.contacts[i].id !== action.user_id){
                    array.push(state.contacts[i])
                }
                else array.push(updateContact)
            } 
            
            return {...state, contacts: array}
        }
        
        case SEARCHING :{
            let array = []
                for (let key = 0; key < state.contacts.length; key++) {
                    if (state.contacts[key].id === (+action.findUserText) ||
                        state.contacts[key].name.indexOf(action.findUserText) !== -1 ||
                        state.contacts[key].email.indexOf(action.findUserText) !== -1 ||
                        state.contacts[key].number.indexOf(action.findUserText) !== -1) { array.push(state.contacts[key]) }
                }
                if (action.findUserText === ''){array = []}
                        return {...state, filteredList:array,findUserText:action.findUserText}
        }
        default:

            return state
    }
}
export default Reducer

const SEARCHING = 'SEARCHING'
const UPDATE_CONTACT = 'UPDATE_CONTACT'
const  DELETE_CONTACT = 'DELETE_CONTACT'
const LOG_OUT = 'LOG_OUT'
const ADD_NEW_CONTACT = 'ADD_NEW_CONTACT'
const LOG_IN = 'LOG_IN';

export const AddContact = (name, mail,number,country,city) =>{
    return ({type:ADD_NEW_CONTACT,name,mail,number,country,city})
}
export const SetAuth = (login,password) => {
    return ({ type: LOG_IN, login,password});
}

export const SetAuthOut = () => {
    return ({type:LOG_OUT})
}
export const DeleteContact = (user_id) =>{
    return ({type:DELETE_CONTACT,user_id})
}
export const UpdateContact = (user_id,name,mail,number) => {

    return ({type:UPDATE_CONTACT,user_id,name,mail,number})
}

export const FilterForContacts = (findUserText) =>{
    return ({type:SEARCHING, findUserText})
}