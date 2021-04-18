import { GET } from '../CustomFetch';

const FetchSubOrder = async (
	SubOrderID: number,
	BucketID: number,
	Token: string,
	abortControllerSignal: AbortSignal | undefined,
) => {
	return await GET(
		'CartV2/FetchSubOrderDetails',
		{
			ReturnResponse: true,
			Token,
			ThrowError: true,
			QueryData: { BucketID, SubOrderID },
		},
		abortControllerSignal,
	);
};

export default FetchSubOrder;
