import { SAVE_NOTE } from './types';

const initialState = {
    notes: []
}

export const NoteReducer = (state, action) => { 
    switch(action.type) {
        case SAVE_NOTE: return{
            ...state,
            notes: state.notes.push(action.payload)            
        }
        
        default: return state
    }
}