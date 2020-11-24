import config from '../assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const EditProfile = (Name, Email, ProfileImageChanged, ProfileImage, Address, Gender, PinCode, Token, setUploadedPercentage, ProfileImageNotRequired) => {
    return new Promise(async (resolve, reject) => {
        if(Name.replace(/\s+/, "").length === 0)
            return reject('not a valid Name');
        if(!validateEmail(Email))
            return reject('not a valid Email');
        if(!ProfileImageChanged)
            return reject('Profile Pic Required');
        if(!Address)
            return reject('Address Required');
        if(!PinCode)
            return reject('PinCode Required');
        
        var Content = 'multipart/form-data';
        var formData = new FormData();
        formData.append('Name', Name);
        formData.append('Email', Email);
        formData.append('Address', Address);
        formData.append('Gender', Gender);
        formData.append('PinCode', PinCode);
        if(!ProfileImageNotRequired) {
            formData.append('ProfileImage', ProfileImage);
        }
        

        try {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", config.BaseURL + 'Profile/EditProfile');
            xhr.setRequestHeader("Content-Type", Content);
            xhr.setRequestHeader("Authorization", Token);
            xhr.onreadystatechange = function() {
                switch(this.status) {
                    case 200 :
                        if(this.readyState === 4) {

                            const AsyncData = [
                                ['Name', Name],
                                ['Email', Email],
                                ['Address', Address],
                                ['Gender', Gender],
                                ['PinCode', PinCode],
                                ['ProfileStatus', '2']
                            ]
                            if(!ProfileImageNotRequired) {
                                AsyncData.push(['ProfileImage', JSON.parse(this.responseText).ProfileImage])
                            }

                            AsyncStorage.multiSet(AsyncData).then(() => {
                                resolve(JSON.parse(this.responseText));
                            }).catch(err => {
                                console.log(err);
                                reject('Error !')
                            })
                        }
                        break;
                    case 401 :
                        console.log(this.responseText)
                        return reject('Authentication Error');
                    case 400 :
                        console.log(this.responseText)
                        return reject('Incorrect Paramters');
                    case 500 :
                        console.log(this.responseText)
                        return reject('Server Error');
                    case 409 :
                        console.log(this.responseText)
                        return reject('File Upload Failed');
                    default : 
                        console.log(this.responseText)
                        return reject('Unknown Error');
                }
            };
            xhr.upload.onprogress = function(e){
                var done = e.position || e.loaded, total = e.totalSize || e.total;
                var Percent = Math.floor(done/total*100);
                setUploadedPercentage(Percent);
            }
            xhr.send(formData);
        }
        catch (err) {
            reject(err.message);
        }

    });
}

export default EditProfile;