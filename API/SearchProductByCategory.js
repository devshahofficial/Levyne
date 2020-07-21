import config from '../assets/constants';
import {timeout} from './Timeout';
const SearchProductByCategory = (CategoryID, Page, Token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await timeout(15000, fetch(config.BaseURL + `Products/getbycategory?Category=${CategoryID}&Page=${Page}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': Token
                }
            }));
            if (resp.status != 200) {
                throw new Error('SearchProductByCategory : Response status not 200');
            }
            else {
                var json = await resp.json();
                resolve(json);
            }
        }
        catch (err) {
            reject('Network Error !');
        }
    });
}

export default SearchProductByCategory;