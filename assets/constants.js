import DeviceInfo from 'react-native-device-info';
export default {
    BaseURL : 'https://api.levyne.com/v1/',
    DeviceID : DeviceInfo.getUniqueId()
};
