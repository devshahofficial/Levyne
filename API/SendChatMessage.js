import AsyncStorage from '@react-native-community/async-storage';
function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}
const SendChatMessage = (socket, setChatList, SelfBrandID, PreviousMsgArray, isNewChat, BrandID, BrandName, Thumbnail, ReferenceID, Timestamp, MessageType, Text, Base64ImageData,ImageMime,  ProductID, ProductObject, BrokerID, BrokerJoinRequestID, DealAmount, DealQuantity, BuyingBrandID, AcceptDealStatus, AcceptDealRequestID) => {
    return new Promise(async (resolve, reject) => {
        if(isNewChat) {
            try {
                var ChatListString = await AsyncStorage.getItem('ChatList');
            } catch {
                var ChatListString = '';
            }
            var ChatList = ChatListString ? JSON.parse(ChatListString) : [];
            ChatList.unshift({
                ChatID : 'Chat-' + SelfBrandID + 'N' + BrandID,
                BrandName : BrandName,
                Timestamp : Timestamp,
                Thumbnail : Thumbnail,
                ...(MessageType === 1 ? {LastMessage : Text} : {}),
                ...(MessageType === 2 ? {LastMessage : 'Image'} : {}),
                ...(MessageType === 3 ? {LastMessage : 'Product : ' + ProductObject.ProductName} : {}),
                ...(MessageType === 4 ? {LastMessage : 'Broker Add Request'} : {}),
                ...(MessageType === 5 ? {LastMessage : 'Your Response to Broker Add Request'} : {}),
                ...(MessageType === 6 ? {} : {}),
                ...(MessageType === 7 ? {} : {}),
                ...(MessageType === 8 ? {LastMessage : 'Deal Request'} : {}),
                ...(MessageType === 9 ? {LastMessage : 'Your Response for the Deal'} : {}),
            });
            ChatList = removeDuplicates(ChatList, 'ChatID');
            setChatList(ChatList);
            await AsyncStorage.setItem('ChatList', JSON.stringify(ChatList));

        }
        var MessageObject = {
            NewChat : isNewChat || false,
            BrandID : BrandID,
            MessageType : MessageType,
            Timestamp : Timestamp,
            ...(MessageType === 1 ? {Text : Text} : {}),
            ...(MessageType === 2 ? {Data : Base64ImageData, ImageMime : ImageMime} : {}),
            ...(MessageType === 3 ? {ProductID : ProductID} : {}),
            ...(MessageType === 4 ? {BrokerID : BrokerID} : {}),
            ...(MessageType === 5 ? {BrokerID : BrokerID, RequestID : BrokerJoinRequestID} : {}),
            ...(MessageType === 6 ? {} : {}),
            ...(MessageType === 7 ? {} : {}),
            ...(MessageType === 8 ? {Amount : DealAmount, ProductID : ProductID, Quantity : DealQuantity, BuyingBrandID : BuyingBrandID, BrokerID : BrokerID} : {}),
            ...(MessageType === 9 ? {RequestID : AcceptDealRequestID, Status : AcceptDealStatus} : {}),
            ReferenceID : ReferenceID,
        }
        socket.emit('MessageToRoom', MessageObject);
        MessageObject = MessageObject.MessageType === 3 ? {...MessageObject, ...ProductObject} : MessageObject
        PreviousMsgArray.push(MessageObject);
        var NewMessageArray = PreviousMsgArray.slice(-20);
        AsyncStorage.setItem('Chat-' + SelfBrandID + 'N' + BrandID, JSON.stringify(NewMessageArray)).catch();
        resolve(NewMessageArray);
    });
}

export default SendChatMessage;