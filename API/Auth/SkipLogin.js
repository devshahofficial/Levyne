import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../assets/constants';

/**
 * @param {(arg0: { SkipLogin: boolean; }) => void} setAuth
 * @param {(arg0: { ProfileStatus: any; }) => void} setProfile
 * @param {number} ProfileStatus
 */
const SkipLogin = async (setAuth, setProfile, ProfileStatus) => {
    setAuth({SkipLogin: true});
    setProfile({ProfileStatus: ProfileStatus});
    // @ts-ignore
    fetch(global.BaseURL + 'SkipLogin', {
        method: 'POST',
        body: JSON.stringify({DeviceID: Constants.DeviceID})
    }).catch(console.log);
    
    return await AsyncStorage.multiSet([
        ['SkipLogin', '1'],
        ['ProfileStatus', '0'],
    ]);
}
export default SkipLogin;