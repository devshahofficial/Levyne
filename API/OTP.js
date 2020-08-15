import config from '../assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
//import NewSocket from '../API/NewSocket';
import CustomRequest from './CustomRequest';
/**
 *  Error codes
 *  1) 0 -> OTP length less then 6 or greater then 6, Human Error
 *  2) 1 -> Netowork Error
 *  3) 2 -> SHA Library Error
 *  4) 3 -> AsyncStorage Error
 */
const verifyOTP = async (Mobile, OTP, OTPTokenHash, UID, setAccessToken, setRefreshToken, setTimestamp, setName, setEmail, setProfileImage, setMobile, setBrandID, setAbout, setAddress) => {
    if(OTP.length != 6)
    {
        throw new Error('Not a valid OTP');
    }
    else
    {
        const json = await CustomRequest('verifyOTP', 'POST', true, undefined, {Mobile, OTP, OTPTokenHash, UID});
        const returnValueArray = ['EditProfileAuth', 'DocumentUpload', 'Pending', 'AppTour'];
        switch(json.ProfileStatus) {
            case 1 :
            case 2 :
            case 3 :
                await AsyncStorage.multiSet([
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', json.Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['ProfileStatus', json.ProfileStatus.toString()],
                    ['BrandID', json.BrandID.toString()]
                ]);
                setAccessToken(json.AccessToken);
                setRefreshToken(json.RefreshToken);
                setTimestamp(json.Timestamp);
                setBrandID(json.BrandID);
                setMobile(Mobile);
                return returnValueArray[json.ProfileStatus - 1];
            case 4 :
                await AsyncStorage.multiSet([
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', json.Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['Name', json.Name],
                    ['Email', json.Email],
                    ['ProfileImage', json.ProfileImage],
                    ['About', json.About],
                    ['Address', json.Address + '\n' + json.City + '-' + json.PinCode],
                    ['ProfileStatus', json.ProfileStatus.toString()],
                    ['BrandID', json.BrandID.toString()]
                ]);
                setAccessToken(json.AccessToken);
                setRefreshToken(json.RefreshToken);
                setTimestamp(json.Timestamp);
                setMobile(Mobile);
                setName(json.Name);
                setEmail(json.Email);
                setBrandID(json.BrandID);
                setProfileImage(json.ProfileImage);
                setAbout(json.About);
                setAddress(json.Address + '\n' + json.City + '-' + json.PinCode);
                //const Socket = await NewSocket(json.AccessToken);
                //setSocket(Socket);
                return returnValueArray[json.ProfileStatus - 1];
        }
    }
}

export default verifyOTP;