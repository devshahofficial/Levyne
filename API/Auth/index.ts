import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../assets/constants';
import NewSocket from './NewSocket';
import FetchChatBuckets from '../Chats/FetchChatBuckets';
import { POST } from '../CustomFetch';
import IsAnyProductInCart from '../Profile/IsAnyProductInCart';
import { Socket } from 'socket.io-client';
import { ChatItemType } from '../../Redux/ReduxStore';

export interface AuthObjectType {
	SkipLogin?: boolean;
	AccessToken?: string;
	RefreshToken?: string;
	Timestamp?: string;
	Mobile?: string | null;
	UserID?: string;
}

export interface ProfileObjectType {
	ProfileStatus: number;
	Name?: string | null;
	Email?: string | null;
	Address?: string | null;
	Gender?: number;
	PinCode?: string | null;
}

export type setAuthType = (AuthObject: AuthObjectType) => void;

export type setProfileType = (ProfileObject: ProfileObjectType) => void;

export type setSocketType = (Socket: Socket) => void;

export type setChatListType = (ChatList: ChatItemType[]) => void;

export type MarkBucketAsUnReadType = (BucketID: number[]) => void;

export type setIsAnyProductInCartType = (IsAnyProductInCart: boolean) => void;

const AuthCheck = async (
	setAuth: setAuthType,
	setProfile: setProfileType,
	setSocket: setSocketType,
	setChatList: setChatListType,
	MarkBucketAsUnRead: MarkBucketAsUnReadType,
	setIsAnyProductInCart: setIsAnyProductInCartType,
): Promise<'MainHomeStack'> => {
	try {
		const SkipLogin = await AsyncStorage.multiGet([
			'SkipLogin',
			'ProfileStatus',
			'Testing',
		]);
		if (SkipLogin[0][1] && parseInt(SkipLogin[0][1], 10)) {
			setAuth({ SkipLogin: true });
			if (SkipLogin[1][1]) {
				setProfile({ ProfileStatus: parseInt(SkipLogin[1][1], 10) });
			}
			return 'MainHomeStack';
		}

		// @ts-ignore
		if (+SkipLogin[2][1]) {
			global.BaseURL = 'https://apitesting603.levyne.com/v1/Users/';
			global.MainURL = 'https://apitesting603.levyne.com/';
			global.Testing = true;
		}

		const Response = await AsyncStorage.multiGet([
			'AccessToken',
			'RefreshToken',
			'Timestamp',
			'UserID',
			'Mobile',
		]);

		if (
			!(
				Response[0][1] &&
				Response[1][1] &&
				Response[2][1] &&
				Response[3][1]
			)
		) {
			throw new Error('Tokens not found');
		}

		let AccessToken = Response[0][1];
		setAuth({
			AccessToken: Response[0][1],
			RefreshToken: Response[1][1],
			Timestamp: Response[2][1],
			Mobile: Response[4][1],
			UserID: Response[3][1],
		});

		const UserID = Response[3][1];

		const ProfileStatus = Number(SkipLogin[1][1]);

		const today = new Date();
		const yesterday = new Date(today);

		yesterday.setHours(yesterday.getHours() - 15);
		const Timestamp = new Date(Response[2][1].replace(' ', 'T'));

		if (Timestamp < yesterday) {
			const RefreshTokenJSON = await POST('RefreshToken', {
				Body: {
					UserID,
					RefreshToken: Response[1][1],
					UID: config.DeviceID,
				},
				ReturnResponse: true,
			});

			await AsyncStorage.multiSet([
				['AccessToken', RefreshTokenJSON.AccessToken],
				['RefreshToken', RefreshTokenJSON.RefreshToken],
				['Timestamp', RefreshTokenJSON.Timestamp],
			]);

			AccessToken = RefreshTokenJSON.AccessToken;

			setAuth({
				AccessToken: RefreshTokenJSON.AccessToken,
				RefreshToken: RefreshTokenJSON.RefreshToken,
				Timestamp: RefreshTokenJSON.Timestamp,
				SkipLogin: false,
			});
		}

		try {
			const SocketObject = await NewSocket(AccessToken);
			setSocket(SocketObject);
		} catch (err) {
			console.log('Socket Creation', err);
		}

		FetchChatBuckets(AccessToken, 1)
			.then((rows) => {
				setChatList(rows[0]);
				MarkBucketAsUnRead(rows[1]);
			})
			.catch((err) => {
				console.log(err);
			});

		IsAnyProductInCart(AccessToken)
			.then((resp) => {
				setIsAnyProductInCart(resp.IsAnyProductInCart);
			})
			.catch(() => {});

		switch (ProfileStatus) {
			case 2:
				const ResponseCase2 = await AsyncStorage.multiGet([
					'Name',
					'Email',
					'Address',
					'Gender',
					'PinCode',
				]);
				setProfile({
					Name: ResponseCase2[0][1],
					Email: ResponseCase2[1][1],
					Address: ResponseCase2[2][1],
					ProfileStatus: 2,
					Gender: Number(ResponseCase2[3][1]),
					PinCode: ResponseCase2[4][1],
				});
				return 'MainHomeStack';
			case 1:
				setProfile({ ProfileStatus: 1 });
				return 'MainHomeStack';
			default:
				return 'MainHomeStack';
		}
	} catch (err) {
		if(err instanceof TypeError && err.message === 'Network request failed') {
			throw new Error('No Internet');
		}
		throw new Error('Login');
	}
};

export default AuthCheck;
