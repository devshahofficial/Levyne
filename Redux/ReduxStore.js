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

/**
 * @param {{ type: string; value: any; }} action
 */
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

/**
 * @param {{ type: string; value: any; }} action
 */
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

const InitialSocketState = {
	Socket: null
};

/**
 * @param {{Socket: ?any}} state
 * @param {{ type: string; value: any; }} action
 */
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

/**
 * @param {{ UnreadBuckets: number[], ChatList: {unread: number}[], ChatLoading: boolean, IsAnyProductInCart: boolean}} state
 * @param {{ type: string; EmptyFirst: boolean; value: any[] | number, itemIndex: number }} action
 */
const ChatReducer = (state = InitialChatStates, action) => {
	switch (action.type) {
		case 'setChatList':
			//Removing any duplicates 
			if(action.EmptyFirst) {
				return {...state, ChatList: action.value};
			} else {	
				if(Array.isArray(action.value)) {
					return {...state, ChatList: _.unionBy(action.value, state.ChatList, 'BucketID'), ChatLoading: false};
				}
			}
		case 'MarkBucketAsUnRead':
			if(action.EmptyFirst) {
				return {...state, UnreadBuckets: action.value};
			} else {
				if(Array.isArray(action.value)) {
					state.UnreadBuckets.push(...action.value);
				}
			}
			return {...state};
		case 'MarkBucketAsRead':
			if(Number.isInteger(action.value)) {
				const index = state.UnreadBuckets.indexOf(Number(action.value));
				if (index > -1) {
					state.UnreadBuckets.splice(index, 1);
				}
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


const InitialWishlistState = {
	Products: [],
	Fabrics: [],
};

const WishlistReducer = (state = InitialWishlistState, action) => {
	switch (action.type) {
		case 'setWishlist':
			return action.value;
		case 'setProductWishlist':
			//Removing any duplicates 
			if(action.EmptyFirst) {
				return {...state, Products: action.value};
			} else {
				if(Number.isInteger(action.value)) {
					return {...state, Products: [...state.Products, action.value]};
				} else {
					return state;
				}
			}
		case 'RemoveFromProductWishlist':
			if(Number.isInteger(action.value)) {
				let index = state.Products.indexOf(action.value);
				if (index !== -1) {
					state.Products.splice(index, 1);
				}
				return {...state, Products: [...state.Products]};
			} else {
				return state;
			}
		case 'setFabricWishlist':
			//Removing any duplicates 
			if(action.EmptyFirst) {
				return {...state, Fabrics: action.value};
			} else {	
				if(Number.isInteger(action.value)) {
					return {...state, Fabrics: [...state.Fabrics, action.value]};
				} else {
					return state;
				}
			}
		case 'RemoveFromFabricWishlist':
			if(Number.isInteger(action.value)) {
				let index = state.Fabrics.indexOf(action.value);
				if (index !== -1) {
					state.Fabrics.splice(index, 1);
				}
				return {...state, Fabrics: [...state.Fabrics]};
			} else {
				return state;
			}
		case 'ResetWishlist':
			return InitialWishlistState;
		default:
			return state;
	}
};



export default createStore(combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
    Socket: SocketReducer,
    Chat: ChatReducer,
	Wishlist: WishlistReducer,
}));