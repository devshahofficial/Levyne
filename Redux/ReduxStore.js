import {createStore, combineReducers } from 'redux';
import _ from 'lodash';

const IntialAuthStates = {
	AccessToken : undefined,
	RefreshToken : undefined,
    Timestamp : undefined,
    Mobile : undefined,
    UserID : undefined,
    SkipLogin: false
}

const AuthReducer = (state = IntialAuthStates, action) => {
	switch(action.type)
	{
        case 'setSkipLogin' :
			return {...state, SkipLogin : action.value}
		case 'setAccessToken' :
			return {...state, AccessToken : action.value}
		case 'setRefreshToken' :
			return {...state, RefreshToken : action.value}
		case 'setTimestamp' :
            return {...state, Timestamp : action.value}
        case 'setUserID' :
            return {...state, UserID : action.value}
        case 'setMobile' :
            return {...state, Mobile : action.value}
        case 'setAuth' :
            return {...state, ...action.value}
        case 'ResetAuth' :
            return {}
        default :
            return state;
	}
}

const IntialProfileStates = {
    ProfileStatus: 0
}

const ProfileReducer = (state = IntialProfileStates, action) => {
    switch(action.type)
    {
        case 'setName' :
			return {...state, Name : action.value}
		case 'setEmail' :
			return {...state, Email : action.value}
		case 'setProfileImage' :
			return {...state, ProfileImage : action.value}
        case 'setAddress' :
            return {...state, Address : action.value}
        case 'setProfile' :
            return {...state, ...action.value}
        case 'ResetProfile' :
            return {}
        default :
			return state;
    }
}

const InitialSocketState = {};

const SocketReducer = (state = InitialSocketState, action) => {
	switch (action.type) {
		case 'setSocket':
			return {...state, Socket: action.value};
		case 'ResetSocket':
			state.Socket.close && state.Socket.close();
			return {};
		default:
			return state;
	}
};

const InitialChatStates = {
	UnreadBuckets: [],
	ChatList: [],
	ChatLoading: true
};

const ChatReducer = (state = InitialChatStates, action) => {
	switch (action.type) {
		case 'setChatList':
			//Removing any duplicates
			return {...state, ChatList: _.unionBy(action.value, state.ChatList, 'BucketID'), ChatLoading: false};
		case 'MarkBucketAsUnRead':
			state.UnreadBuckets.push(...action.value);
			return {...state};
		case 'MarkBucketAsRead':
			const index = state.UnreadBuckets.indexOf(action.value);
			if (index > -1) {
				state.UnreadBuckets.splice(index, 1);
			}
			state.ChatList[action.itemIndex].unread = 0;
			return {ChatList: [...state.ChatList], UnreadBuckets: [...state.UnreadBuckets]};
		case 'StopChatLoading':
			return {...state, ChatLoading: false};
		case 'ResetChat':
			return {};
		default:
			return state;
	}
};

export default createStore(combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
    Socket: SocketReducer,
    Chat: ChatReducer,
}));