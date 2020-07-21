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
const verifyOTP = async (Mobile, OTP, OTPTokenHash, UID, setAccess_token, setRefresh_token, setTimestamp, setName, setEmail, setProfileImage, setMobile, setBrandID, setAbout, setAddress) => {
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
                    ['access_token', json.access_token],
                    ['refresh_token', json.refresh_token],
                    ['timestamp', json.timestamp],
                    ['Mobile', Mobile.toString()],
                    ['ProfileStatus', json.ProfileStatus.toString()],
                    ['BrandID', json.BrandID.toString()]
                ]);
                setAccess_token(json.access_token);
                setRefresh_token(json.refresh_token);
                setTimestamp(json.timestamp);
                setBrandID(json.BrandID);
                setMobile(Mobile);
                return returnValueArray[json.ProfileStatus - 1];
            case 4 :
                await AsyncStorage.multiSet([
                    ['access_token', json.access_token],
                    ['refresh_token', json.refresh_token],
                    ['timestamp', json.timestamp],
                    ['Mobile', Mobile.toString()],
                    ['Name', json.Name],
                    ['Email', json.Email],
                    ['ProfileImage', json.ProfileImage],
                    ['About', json.About],
                    ['Address', json.Address + '\n' + json.City + '-' + json.PinCode],
                    ['ProfileStatus', json.ProfileStatus.toString()],
                    ['BrandID', json.BrandID.toString()]
                ]);
                setAccess_token(json.access_token);
                setRefresh_token(json.refresh_token);
                setTimestamp(json.timestamp);
                setMobile(Mobile);
                setName(json.Name);
                setEmail(json.Email);
                setBrandID(json.BrandID);
                setProfileImage(json.ProfileImage);
                setAbout(json.About);
                setAddress(json.Address + '\n' + json.City + '-' + json.PinCode);
                //const Socket = await NewSocket(json.access_token);
                //setSocket(Socket);
                return returnValueArray[json.ProfileStatus - 1];
        }
    }
}

export default verifyOTP;