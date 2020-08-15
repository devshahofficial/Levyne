import DeviceInfo from 'react-native-device-info';
export default {
    BaseURL : 'https://api.levyne.com/v1/Users/',
    DeviceID : DeviceInfo.getUniqueId()
};
