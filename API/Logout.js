import AsyncStorage from '@react-native-community/async-storage';

const Logout = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.clear(err => {
            if(err) {
                console.log(err);
                return reject('Logout failed');
            }
            resolve();
        })
    })
}
export default Logout;