import {combineReducers, createStore} from 'redux'

// Replaces 'actions.js'
export const setData = data => ({
    type: 'SET_DATA',
    data,
});

// Replaces 'reducers.js'
export const data = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.data;
        default:
            return state;
    }
};

export const reducers = combineReducers({
    data,
});

// Replaces 'store.js'
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
}

export const store = configureStore();
