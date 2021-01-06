import {createStore, combineReducers } from 'redux';
import _ from 'lodash';

const InitialAuthStates = {
	AccessToken : undefined,
	RefreshToken : undefined,
    Timestamp : undefined,
    Mobile : undefined,
    UserID : undefined,
    SkipLogin: false
}

const AuthReducer = (state = InitialAuthStates, action) => {
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

const InitialProfileStates = {
    ProfileStatus: 0
}

const ProfileReducer = (state = InitialProfileStates, action) => {
    switch(action.type)
    {
        case 'setName' :
			return {...state, Name : action.value}
		case 'setEmail' :
			return {...state, Email : action.value}
        case 'setAddress' :
            return {...state, Address : action.value}
        case 'setProfile' :
            return {...state, ...action.value}
        case 'ResetProfile' :
            return {
				ProfileStatus: 0
			}
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
	ChatLoading: true,
	IsAnyProductInCart: false,
};

const ChatReducer = (state = InitialChatStates, action) => {
	switch (action.type) {
		case 'setChatList':
			//Removing any duplicates 
			if(action.EmptyFirst) {
				return {...state, ChatList: action.value};
			} else {		
				return {...state, ChatList: _.unionBy(action.value, state.ChatList, 'BucketID'), ChatLoading: false};
			}
		case 'MarkBucketAsUnRead':
			if(action.EmptyFirst) {
				return {...state, UnreadBuckets: action.value};
			} else {
				state.UnreadBuckets.push(...action.value);
			}
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
		case 'setIsAnyProductInCart':
			return {...state, IsAnyProductInCart: action.value};
		case 'ResetChat':
			return {
				UnreadBuckets: [],
				ChatList: [],
				ChatLoading: true,
				IsAnyProductInCart: false,
			};
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