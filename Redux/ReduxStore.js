import {createStore, combineReducers } from 'redux';

const IntialAuthStates = {
	access_token : '',
	refresh_token : '',
    timestamp : '',
    Mobile : '',
    UserID : '',
    SkipLogin: false
}

const AuthReducer = (state = IntialAuthStates, action) => {
	switch(action.type)
	{
        case 'setSkipLogin' :
			return {...state, SkipLogin : action.value}
		case 'setAccess_token' :
			return {...state, access_token : action.value}
		case 'setRefresh_token' :
			return {...state, refresh_token : action.value}
		case 'setTimestamp' :
            return {...state, timestamp : action.value}
        case 'setUserID' :
            return {...state, UserID : action.value}
        case 'setMobile' :
            return {...state, Mobile : action.value}
        case 'ResetAuth' :
            return {}
        default :
            return state;
	}
}

const IntialProfileStates = {
    Name : '',
	Email : '',
	ProfileImage : '',
    About : '',
    Address : '',
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
		case 'setAbout' :
			return {...state, About : action.value}
        case 'setAddress' :
            return {...state, Address : action.value}
        case 'ResetProfile' :
            return {}
        default :
			return state;
    }
}

const IntialSocketState = {
    Socket : null
}

const SocketReducer = (state = IntialSocketState, action) => {
    switch(action.type)
    {
        case 'setSocket' :
            return {...state, Socket : action.value}
        case 'ResetSocket' :
            state.Socket.close && state.Socket.close();
            return {}
		default :
			return state;
    }
}

const IntialChatStates = {
    IsAnyUnreadMessage : false,
    ChatList : [],
}

const ChatReducer = (state = IntialChatStates, action) => {
    switch(action.type)
    {
        case 'setChatList' :
            return {...state, ChatList : action.value}
        case 'setIsAnyUnreadMessage' : 
            return {...state, IsAnyUnreadMessage : action.value}
        case 'ResetChat' :
            return {}
		default :
			return state;
    }
}

export default createStore(combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
    Socket: SocketReducer,
    Chat: ChatReducer
}));