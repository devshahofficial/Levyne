import {GET} from '../CustomFetch';

const FetchDesignsByLevyne = async (Page, Seed, abortControllerSignal) => {

    return await GET('Products/FetchDesignsByLevyneWithRandomness', {
        QueryData: {
            Page,
            ...(Seed ? {Seed} : {})
        },
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchDesignsByLevyne; 