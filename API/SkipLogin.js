import AsyncStorage from '@react-native-community/async-storage';

const SkipLogin = async (setAuth, setProfile, ProfileStatus) => {
    setAuth({SkipLogin: true});
    setProfile({ProfileStatus: ProfileStatus});
    return await AsyncStorage.multiSet([
        ['SkipLogin', '1'],
        ['ProfileStatus', '0'],
    ]);
}
export default SkipLogin;