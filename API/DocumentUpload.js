import config from '../assets/constants';
import AsyncStorage from '@react-native-community/async-storage';

const DocumentUplaod = (IDProof, AddressProof, BrandProof, Token, setUploadedPercentage) => {
    return new Promise(async (resolve, reject) => {
        if(IDProof && AddressProof && BrandProof) {
            var Content = 'multipart/form-data';
            var formData = new FormData();
            formData.append('Proof[]', IDProof);
            formData.append('Proof[]', AddressProof);
            formData.append('Proof[]', BrandProof);
            
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", config.BaseURL + 'Documents/UploadDocuments');
                xhr.setRequestHeader("Content-Type", Content);
                xhr.setRequestHeader("Authorization", Token);
                xhr.onreadystatechange = function() {
                    switch(this.status) {
                        case 200 :
                            if(this.readyState === 4) {
                                AsyncStorage.setItem('ProfileStatus', '3').then(() => {
                                    resolve('Success');
                                }).catch(err => {
                                    console.log(err);
                                    return reject('async Error');
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
                    }
                };
                xhr.upload.onprogress = function(e){
                    var done = e.position || e.loaded, total = e.totalSize || e.total
                    var Percent = Math.floor(done/total*100)
                    setUploadedPercentage(Percent);
                }
                xhr.send(formData);
            }
            catch (err) {
                console.log(err);
                reject('Document Upload : Network Error !');
            }
        }
        else {
            reject('All 3 Documents required');
        }
    });
}

export default DocumentUplaod;