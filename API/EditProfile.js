import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST } from './CustomFetch';

const EditProfile = async (Name, Email, Address, Gender, PinCode, Token) => {

    try {
        await POST('Profile/EditProfile', {
            Body: { Name, Email, Address, Gender, PinCode},
            Token,
            ThrowError: true
        });
        const AsyncData = [
            ['Name', Name],
            ['Email', Email],
            ['Address', Address],
            ['Gender', Gender],
            ['PinCode', PinCode],
            ['ProfileStatus', '2']
        ];
        AsyncStorage.multiSet(AsyncData).catch(() => {});

    } catch(err) {
        try {
            err = JSON.parse(err).description
        } catch(e) {
            console.log(err);
            throw "Something went wrong !"
        }
        throw err;
    }
}

export default EditProfile;