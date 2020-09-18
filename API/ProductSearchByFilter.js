import config from '../assets/constants';

const ProductSearchByFilter = (FilterObject, Page, OrderBy, Token, abortControllerSignal) => {
    return new Promise(async (resolve, reject) => {
        var FetchUrl = config.BaseURL + `Products/FetchByFilter/?`;
        FilterObject.forEach(function(item) {
            FetchUrl = FetchUrl + item.key + '=' + item.value + '&'
        });
        if(OrderBy) {
            FetchUrl = FetchUrl + 'OrderBy=' + OrderBy + '&';
        }
        if(Page) {
            FetchUrl = FetchUrl + 'Page=' + Page;
        } else {
            FetchUrl = FetchUrl + 'Page=1';
        }
        try {
            const resp = await fetch(FetchUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': Token
                },
                signal: abortControllerSignal
            });
            if (resp.status != 200) {
                throw new Error('ProductFilter : Response status not 200');
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

export default ProductSearchByFilter;