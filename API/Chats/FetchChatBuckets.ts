import { GET } from '../CustomFetch';
import timeAgo from './timeAgo';
import { ChatItemType } from '../../Redux/ReduxStore';

const GetLastMessage = (Message: ChatItemType) => {
	switch (Message.Type) {
		case 1:
			return Message.Text;
		case 2:
			return '📷 Photo';
		case 3:
			return 'You placed an order';
		case 4:
			return 'You cancelled an order';
		case 5:
			return 'Brand added customization charge';
		case 6:
			return 'You Paid an customization charge';
		default:
			return Message.Text || '';

		//More cases here
	}
};

const GetChatLists = async (
	Token: string,
	Page: undefined | number,
	abortController?: AbortSignal,
): Promise<[ChatItemType[], number[]]> => {
	if (Token) {
		let ChatList: ChatItemType[] = await GET(
			'Chat/FetchChatBuckets',
			{
				ReturnResponse: true,
				Token,
				QueryData: {
					Page,
				},
			},
			abortController,
		);

		const unreadBuckets: number[] = [];
		ChatList = ChatList.map((item: ChatItemType) => {
			if (item.unread) {
				unreadBuckets.push(item.BucketID);
			}
			item.Message = GetLastMessage(item);
			delete item.Type;
			delete item.Text;
			item.Timestamp = timeAgo(item.Timestamp);
			return item;
		});
		return [ChatList, unreadBuckets];
	} else {
		return [[], []];
	}
};

export default GetChatLists;
