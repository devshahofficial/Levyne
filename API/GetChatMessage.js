import AsyncStorage from '@react-native-community/async-storage';
const GetChatMessage = (SelfBrandID, BrandID, ChatID) => {
    if(ChatID) {
        return new Promise(async (resolve, reject) => {
            AsyncStorage.getItem(ChatID).then(JSON.parse).then(resolve).catch(() => {
                resolve([]);
            });
        });
    }
    return new Promise(async (resolve, reject) => {
        AsyncStorage.getItem('Chat-' + SelfBrandID + 'N' + BrandID).then(JSON.parse).then(resolve).catch(() => {
            resolve([]);
        });
    });
}

export default GetChatMessage;