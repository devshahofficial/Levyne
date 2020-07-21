import config from '../assets/constants';
export default RequestBrokerage = (BrandID, Token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await fetch(config.BaseURL + `Profile/RequestBrokerShip`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': Token
                },
                body: JSON.stringify({
                    BrandID : BrandID
                })
            });
            if (resp.status != 200) {
                console.log(resp.status);
                throw new Error('Response status not 200');
            }
            else {
                var json = await resp.json();
                resolve(json);
            }
        }
        catch (err) {
            console.log(err);
            reject('Network Error !');
        }
    });
}