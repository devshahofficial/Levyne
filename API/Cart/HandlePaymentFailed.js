import { POST } from '../CustomFetch';

const HandleFailedPaymentResponse = async (
	order_id,
	BucketID,
	Token,
	abortControllerSignal,
) => {
	return await POST(
		'Orders/HandleFailedPaymentResponse',
		{
			ReturnResponse: true,
			ThrowError: true,
			Token,
			Body: { order_id, BucketID },
		},
		abortControllerSignal,
	);
};
export default HandleFailedPaymentResponse;
