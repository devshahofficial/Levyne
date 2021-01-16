import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import {POST} from '../CustomFetch';
import Constants from '../../assets/constants';

const Logout = (AccessToken) => {
    PushNotification.abandonPermissions();
    POST('Logout', {
        ReturnResponse: false,
        Token: AccessToken,
        Body: {
            DeviceID: Constants.DeviceID
        }
    }).catch(() => {});
    AsyncStorage.clear(() => {});
}
export default Logout;