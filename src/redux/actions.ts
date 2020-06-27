import { SAVE_NOTE } from './types'

export const saveNote = payload => {
    return {
        type: SAVE_NOTE,
        payload
    };
};

