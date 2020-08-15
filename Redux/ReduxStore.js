import {createStore, combineReducers } from 'redux';

const IntialAuthStates = {
	AccessToken : '',
	RefreshToken : '',
    Timestamp : '',
    Mobile : '',
    UserID : '',
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
        case 'setProfile' :
            return {...state, ...action.value}
        case 'ResetProfile' :
            return {}
        default :
			return state;
    }
}

export default createStore(combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer
}));