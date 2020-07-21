import config from '../assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const EditProfile = (Name, Email, About, ProfilePicChanged, profilePic, Address, City, PinCode, Token, setUploadedPercentage) => {
    return new Promise(async (resolve, reject) => {
        if(Name.replace(/\s+/, "").length === 0)
            return reject('not a valid Name');
        if(!validateEmail(Email))
            return reject('not a valid Email');
        if(!ProfilePicChanged)
            return reject('Profile Pic Required');
        
        var Content = 'multipart/form-data';
        var formData = new FormData();
        formData.append('Name', Name);
        formData.append('Email', Email);
        formData.append('About', About);
        formData.append('File', profilePic);
        //var body = formData;


        try {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", config.BaseURL + 'Profile/EditProfile');
            xhr.setRequestHeader("Content-Type", Content);
            xhr.setRequestHeader("Authorization", Token);
            xhr.onreadystatechange = function() {
                switch(this.status) {
                    case 200 :
                        if(this.readyState === 4) {
                            AsyncStorage.multiSet([
                                ['Name', Name],
                                ['Email', Email],
                                ['ProfileImage', JSON.parse(this.responseText).ProfileImage],
                                ['About', About],
                                ['ProfileStatus', '2']
                            ]).then(() => {
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
            reject(err);
        }

    });
}

export default EditProfile;