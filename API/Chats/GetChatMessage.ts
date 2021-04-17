import { POST } from '../CustomFetch';
import timeAgo from './timeAgo';

export type ChatMessage = {
	BucketMessagesID: number | string;
	Type: number;
	isSentByCustomer: 1 | 0 | boolean;
	Text?: string;
	ImageURL?: string;
	Price?: number;
	Note?: string;
	RazorpayOrderID?: string;
	PaymentTimestamp?: string | number | Date;
	Timestamp: string | number | Date;
	BucketID?: number;
};

export type BucketInfo = {
	OrderID?: number;
	Status?: number;
};

export interface ChatMessages {
	Messages: ChatMessage[];
	BucketInfo: BucketInfo;
}

const GetChatMessages = async (
	BucketID: number,
	Page: number,
	Token: string,
) => {
	let ChatMessages: ChatMessages = await POST('Chat/FetchBucketMessages', {
		ReturnResponse: true,
		Token,
		Body: {
			Page,
			BucketID,
		},
	});

	ChatMessages.Messages = ChatMessages.Messages.map((item: ChatMessage) => {
		item.Timestamp = timeAgo(item.Timestamp);
		return item;
	});

	return ChatMessages;
};

export default GetChatMessages;
