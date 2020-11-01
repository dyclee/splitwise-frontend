import { MergeType } from '@material-ui/icons';
import { SEND_REQUEST, GET_FRIENDS } from '../actions/friends';

export default function friendReducer(state = { requests: []}, action) {
    switch (action.type) {
        case SEND_REQUEST: {
            const newState = {...state }
            newState.requests.push(action.email);
            return newState;
        }
        case GET_FRIENDS: {
            return {
                ...state,
                friends: action.friends
            }
        }
        default: return state;
    }
}
