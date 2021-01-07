import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST } from './CustomFetch';
import NewSocket from './NewSocket';
import FetchChatBuckets from './FetchChatBuckets';
import IsAnyProductInCart from './IsAnyProductInCart';

const verifyOTP = async (Mobile, OTP, OTPTokenHash, UID, FirebaseToken, setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart) => {
    if(OTP.length != 6)
    {
        throw new Error('Not a valid OTP');
    }
    else
    {
        const json = await POST('verifyOTP', {ReturnResponse: true, Body: {Mobile, OTP, OTPTokenHash, UID, FirebaseToken}})

        switch(json.ProfileStatus) {
            case 1 :
                await AsyncStorage.multiSet([
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', json.Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['ProfileStatus', '1'],
                    ['UserID', json.CustomerID.toString()],
                    ['SkipLogin', '0']
                ]);


                setAuth({
                    AccessToken : json.AccessToken,
                    RefreshToken : json.RefreshToken,
                    Timestamp : json.Timestamp,
                    Mobile : Mobile,
                    UserID : json.CustomerID,
                    SkipLogin: false
                })

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
                    ['Timestamp', json.Timestamp],
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
                    Timestamp : json.Timestamp,
                    Mobile : Mobile,
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