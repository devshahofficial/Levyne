import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST } from '../CustomFetch';
import NewSocket from './NewSocket';
import FetchChatBuckets from '../Chats/FetchChatBuckets';
import IsAnyProductInCart from '../Profile/IsAnyProductInCart';
import { Socket } from 'socket.io-client';

interface AuthObject {
    SkipLogin?: boolean;
    AccessToken?: string;
    RefreshToken?: string;
    Timestamp?: string;
    Mobile?: string | null;
    UserID?: string;
}

interface ProfileObject {
    ProfileStatus: number;
    Name?: string | null;
    Email?: string | null;
    Address?: string | null;
    Gender?: number;
    PinCode?: string | null;
}

type setAuth = (AuthObject: AuthObject) => void;

type setProfile = (ProfileObject: ProfileObject) => void;

type setSocket = (Socket: Socket) => void;

type setChatList = (ChatList: any[]) => void;

type MarkBucketAsUnRead = (BucketID: number) => void;

type setIsAnyProductInCart = (IsAnyProductInCart: boolean) => void;

const verifyOTP = async (Mobile: number, OTP: string, OTPTokenHash: string, UID: string, FirebaseToken: string, setAuth: setAuth, setProfile: setProfile, setSocket: setSocket, setChatList: setChatList, MarkBucketAsUnRead: MarkBucketAsUnRead, setIsAnyProductInCart: setIsAnyProductInCart): Promise<string> => {
    if(OTP.length != 6)
    {
        throw new Error('Not a valid OTP');
    }
    else
    {
        const json = await POST('verifyOTP', {ReturnResponse: true, Body: {Mobile, OTP, OTPTokenHash, UID, FirebaseToken}, ThrowError: true})

        const date = new Date();
        
	    const Timestamp = date.toISOString().split('T')[0] + ' '  + date.toTimeString().split(' ')[0];

        if(!json.Address) {
            json.ProfileStatus = 1;
        }
        switch(json.ProfileStatus) {
            case 1 :

                const AsyncStorageData = [
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['ProfileStatus', '1'],
                    ['UserID', json.CustomerID.toString()],
                    ['SkipLogin', '0']
                ]
                if(json.Name) {
                    AsyncStorageData.push(
                        ['Name', json.Name],
                        ['Email', json.Email],
                        ['Gender', json.Gender.toString()],
                    )
                }

                await AsyncStorage.multiSet(AsyncStorageData);

                setAuth({
                    AccessToken : json.AccessToken,
                    RefreshToken : json.RefreshToken,
                    Timestamp : Timestamp,
                    Mobile : Mobile.toString(),
                    UserID : json.CustomerID,
                    SkipLogin: false
                })

                if(json.Name) {
                    setProfile({
                        Name : json.Name,
                        Email : json.Email,
                        Address : json.Address,
                        PinCode : json.PinCode,
                        Gender : json.Gender,
                        ProfileStatus: 2
                    });
                }

                NewSocket(json.AccessToken).then(Socket => {
                    setSocket(Socket);
                }).catch(err => {
                    console.log(err);
                })
        
                FetchChatBuckets(json.AccessToken, 1).then(rows => {
                    MarkBucketAsUnRead(rows[1]);
                    setChatList(rows[0]);
                }).catch(err => {
                    console.log(err);
                });

                IsAnyProductInCart(json.AccessToken).then(resp => {
                    setIsAnyProductInCart(resp.IsAnyProductInCart);
                })

                return 'EditProfileAuth';
            case 2 :
                await AsyncStorage.multiSet([
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['Name', json.Name],
                    ['Email', json.Email],
                    ['Address', json.Address],
                    ['PinCode', json.PinCode.toString()],
                    ['Gender', json.Gender.toString()],
                    ['ProfileStatus', '2'],
                    ['UserID', json.CustomerID.toString()],
                    ['SkipLogin', '0']
                ]);

                setAuth({
                    AccessToken : json.AccessToken,
                    RefreshToken : json.RefreshToken,
                    Timestamp : Timestamp,
                    Mobile : Mobile.toString(),
                    UserID : json.CustomerID,
                    SkipLogin: false
                });

                setProfile({
                    Name : json.Name,
                    Email : json.Email,
                    Address : json.Address,
                    PinCode : json.PinCode,
                    Gender : json.Gender,
                    ProfileStatus: 2
                });

                NewSocket(json.AccessToken).then(Socket => {
                    setSocket(Socket);
                }).catch(err => {
                    console.log(err);
                })
        
                IsAnyProductInCart(json.AccessToken).then(resp => {
                    setIsAnyProductInCart(resp.IsAnyProductInCart);
                })

                FetchChatBuckets(json.AccessToken, 1).then(rows => {
                    MarkBucketAsUnRead(rows[1]);
                    setChatList(rows[0]);
                }).catch(err => {
                    console.log(err);
                })

                return 'MainHomeStack';
            default :
                return 'MainHomeStack';
        }
    }
}

export default verifyOTP;