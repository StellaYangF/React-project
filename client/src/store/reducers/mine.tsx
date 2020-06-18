import {AnyAction} from 'redux';
export interface MimeState {}

let initialState: MimeState = {};

export default function(state: MimeState = initialState, action: AnyAction) {
    switch(action.type) {
        default: 
            return state;
    }
}
