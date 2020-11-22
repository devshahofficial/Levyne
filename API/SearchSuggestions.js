import {GET} from './CustomFetch';

export default SearchSuggestions = async (SearchKey, abortControllerSignal) => {

    return (await GET('SearchSuggestions', {
        ReturnResponse: true,
        QueryData: {SearchKey}
    }, abortControllerSignal)).map(item => {
        return {
            Type: 3,
            Label: item
        }
    })

}