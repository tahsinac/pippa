import {createStore} from 'redux'


const timerReducer = (state = {buttonDisabled: false}, action) => {
    if(action.type === 'toggle'){
        return{
            buttonDisabled: !state.buttonDisabled
        }
    }
    return state;
};

const store = createStore(timerReducer);

export default store;