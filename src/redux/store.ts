import { createStore, combineReducers, applyMiddleware } from 'redux'
import { NoteReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { saveNote } from './actions'
import logger from 'redux-logger'



var rootReducer = combineReducers({
    notes: NoteReducer,    
}) 

const store = createStore(rootReducer,
    // applyMiddleware(...midd),
    composeWithDevTools(applyMiddleware(logger))
    // other store enhancers if any
);

console.log('Initial state  store.getState():::', store.getState())

const unsubscribe = store.subscribe(()=>{})
store.dispatch(saveNote('hi'))
unsubscribe()

export default store