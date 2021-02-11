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

    const LastUpdated = await AsyncStorage.getItem('LastUpdated');

    if(!(LastUpdated && (new Date().toISOString().substring(0,13)) === LastUpdated)) {
        // @ts-ignore
        fetch(global.BaseURL + 'SkipLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({DeviceID: Constants.DeviceID})
        }).then(async resp => {
            console.log(await resp.text());
        }).catch(console.log);
    }
    
    return await AsyncStorage.multiSet([
        ['SkipLogin', '1'],
        ['ProfileStatus', '0'],
        ['LastUpdated', new Date().toISOString().substring(0,13)]
    ]);
}
export default SkipLogin;