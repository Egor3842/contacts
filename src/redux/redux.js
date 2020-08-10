import {createStore, combineReducers} from 'redux'

import Reducer from "./Reducer";
let reducers=combineReducers({
    Reducer:Reducer
});

const saveState = (state) => {
   
    try {

        const serialisedState = JSON.stringify(state);
        window.sessionStorage.setItem('app_state', serialisedState);
    } catch (err) {
    }
};
const loadState = () => {
    try {
        const serialisedState = window.sessionStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};

const oldState = loadState();

export const store = createStore(reducers, oldState);
store.subscribe(() => {
    saveState(store.getState());
});


